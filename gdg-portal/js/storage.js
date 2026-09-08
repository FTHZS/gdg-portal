/**
 * Storage layer for recruitment submissions.
 *
 * WHY AN ABSTRACTION LAYER:
 * This is a static, zero-backend site — there's no server, so there's
 * nothing to host and nothing to pay for. Submissions live in the
 * browser's localStorage under a single key, as a JSON array.
 *
 * Every other file in the app talks to `Store.*`, never to
 * `localStorage` directly. That means the persistence mechanism can be
 * swapped later (a free Google Apps Script + Sheets endpoint, a
 * Firebase free-tier project, etc.) by rewriting only this file —
 * the rest of the app (forms, admin table, validation) doesn't change.
 * That's the "cost-reduction" angle: you get a fully working demo at
 * $0 infra cost, with a clean seam to grow out of it later.
 *
 * DATA SHAPE (one submission):
 * {
 *   id: string,              // unique id, generated at submit time
 *   name: string,
 *   email: string,
 *   regNo: string,
 *   phone: string,
 *   department: string,      // department slug
 *   departmentName: string,  // display name, denormalized for the admin table
 *   answers: string[],       // answers, in the same order as the dept's questions
 *   shortlisted: boolean,
 *   createdAt: string        // ISO timestamp
 * }
 */

const Store = (() => {
  const KEY = "gdg_recruitment_submissions_v1";

  function _readAll() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      // Corrupt or blocked storage shouldn't crash the app — fail safe to empty.
      console.error("Store: failed to read localStorage, resetting.", err);
      return [];
    }
  }

  function _writeAll(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch (err) {
      // Most likely quota exceeded or storage disabled (private browsing).
      console.error("Store: failed to write to localStorage.", err);
      return false;
    }
  }

  function _uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    // Fallback for older browsers.
    return "id-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  return {
    getAll() {
      return _readAll();
    },

    getByEmail(email) {
      const target = (email || "").trim().toLowerCase();
      return _readAll().filter((s) => s.email.trim().toLowerCase() === target);
    },

    /**
     * Enforces the same two rules the original backend had:
     * - max 2 unique department applications per email
     * - no duplicate application to the same department
     * Returns { ok: true, entry } or { ok: false, message }.
     */
    submit(entry) {
      const existing = this.getByEmail(entry.email);
      const alreadyApplied = existing.some((s) => s.department === entry.department);
      if (alreadyApplied) {
        return { ok: false, message: `You've already submitted an application for ${entry.departmentName}.` };
      }
      if (existing.length >= 2) {
        return { ok: false, message: "You can only submit up to 2 unique department applications." };
      }

      const all = _readAll();
      const record = {
        id: _uuid(),
        ...entry,
        shortlisted: false,
        createdAt: new Date().toISOString()
      };
      all.push(record);
      const wrote = _writeAll(all);
      if (!wrote) {
        return { ok: false, message: "Your browser blocked local storage (private/incognito mode?). Try a normal window." };
      }
      return { ok: true, entry: record };
    },

    setShortlisted(id, value) {
      const all = _readAll();
      const idx = all.findIndex((s) => s.id === id);
      if (idx === -1) return false;
      all[idx].shortlisted = value;
      return _writeAll(all);
    },

    clearAll() {
      return _writeAll([]);
    },

    /**
     * Seeds a handful of realistic-looking demo applications so the admin
     * view isn't empty on first load. Skipped automatically if there's
     * already real data, and every seeded row is tagged `demo: true` so
     * it can be told apart/cleared separately from genuine submissions.
     */
    seedDemo() {
      if (_readAll().length > 0) return { ok: false, message: "Data already exists — clear it first if you want a fresh demo set." };

      const names = [
        "Ananya Reddy", "Karthik Subramaniam", "Priya Nair", "Rohan Mehta",
        "Sneha Iyer", "Arjun Pillai", "Divya Krishnan", "Vikram Rao",
        "Meera Balaji", "Aditya Varma"
      ];
      const sample = [];
      const usedEmails = new Set();

      for (let i = 0; i < 10; i++) {
        const dept = DEPARTMENTS[i % DEPARTMENTS.length];
        const name = names[i];
        const emailBase = name.toLowerCase().replace(/\s+/g, ".");
        const email = `${emailBase}${i}@vitstudent.ac.in`;
        usedEmails.add(email);

        sample.push({
          id: "demo-" + i + "-" + Date.now(),
          name,
          email,
          phone: "9" + String(100000000 + Math.floor(Math.random() * 800000000)),
          regNo: `2${(3 + (i % 3))}BCE${1000 + i * 137}`,
          department: dept.slug,
          departmentName: dept.name,
          answers: dept.questions.map(() => "Demo answer — replace with a real applicant response."),
          shortlisted: i % 4 === 0,
          demo: true,
          createdAt: new Date(Date.now() - i * 3600_000 * (i + 1)).toISOString()
        });
      }

      _writeAll(sample);
      return { ok: true, count: sample.length };
    },

    exportCSV() {
      const rows = _readAll();
      if (!rows.length) return "";
      const headers = ["id", "name", "email", "regNo", "phone", "department", "shortlisted", "createdAt"];
      const lines = [headers.join(",")];
      rows.forEach((r) => {
        const line = headers.map((h) => {
          const val = (r[h] ?? "").toString().replace(/"/g, '""');
          return `"${val}"`;
        }).join(",");
        lines.push(line);
      });
      return lines.join("\n");
    }
  };
})();

/**
 * Lightweight announcements/updates store — same localStorage pattern
 * as `Store`, kept separate since it's a different kind of data
 * (chapter posts, not applications).
 */
const Announcements = (() => {
  const KEY = "gdg_announcements_v1";

  function _readAll() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function _writeAll(list) {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
      return true;
    } catch {
      return false;
    }
  }

  function _uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "post-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  return {
    getAll() {
      return _readAll().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
    add({ title, body }) {
      const all = _readAll();
      const post = { id: _uuid(), title, body, createdAt: new Date().toISOString() };
      all.push(post);
      _writeAll(all);
      return post;
    },
    remove(id) {
      const all = _readAll().filter((p) => p.id !== id);
      return _writeAll(all);
    }
  };
})();
