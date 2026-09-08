document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("form-root");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("dept");
  const dept = getDepartmentBySlug(slug);

  if (!dept) {
    root.innerHTML = `
      <div class="state-banner warn">
        <div>
          <strong>No department selected</strong>
          <p>Pick a department first, then you'll land here with the right questions.</p>
        </div>
      </div>
      <a href="departments.html" class="btn btn-primary">Browse departments</a>
    `;
    return;
  }

  if (!isRecruitmentOpen()) {
    root.innerHTML = `
      <div class="state-banner error">
        <div>
          <strong>Applications are closed</strong>
          <p>The submission deadline for this recruitment cycle has passed.</p>
        </div>
      </div>
      <a href="departments.html" class="btn btn-ghost">Back to departments</a>
    `;
    return;
  }

  renderForm(dept);

  function renderForm(dept) {
    const questionFields = dept.questions.map((q, i) => `
      <div class="field" data-field="q${i}">
        <label for="q${i}">${q}</label>
        <textarea id="q${i}" name="q${i}" placeholder="Keep it honest and specific — a few sentences is plenty."></textarea>
        <p class="error">This one needs an answer before you can submit.</p>
      </div>
    `).join("");

    root.innerHTML = `
      <div class="form-header">
        <div class="dept-icon" style="--tone:${dept.tone}">
          <img src="assets/icons/${dept.icon}" alt="" />
        </div>
        <h1>${dept.name}</h1>
      </div>
      <p class="form-sub">${dept.description} · Led by ${dept.lead}</p>

      <div class="form-note">
        You can apply to up to <strong>2 departments total</strong>. Submissions are
        matched to you by the email you enter below — use the same one if you
        apply again.
      </div>

      <form id="apply-form" class="form-card" novalidate>
        <div class="field" data-field="name">
          <label for="name">Full name</label>
          <input id="name" name="name" type="text" autocomplete="name" />
          <p class="error">Enter your full name.</p>
        </div>

        <div class="field-row">
          <div class="field" data-field="email">
            <label for="email">Email address</label>
            <input id="email" name="email" type="email" autocomplete="email" placeholder="you@vitstudent.ac.in" />
            <p class="error">Enter a valid email address.</p>
          </div>
          <div class="field" data-field="phone">
            <label for="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" autocomplete="tel" placeholder="10-digit number" />
            <p class="error">Enter a valid 10-digit phone number.</p>
          </div>
        </div>

        <div class="field" data-field="regNo">
          <label for="regNo">Registration number <span class="hint">e.g. 25BCE5612</span></label>
          <input id="regNo" name="regNo" type="text" autocomplete="off" style="text-transform:uppercase" />
          <p class="error">Format should be 2 digits, 3 letters, 4 digits — e.g. 25BCE5612.</p>
        </div>

        ${questionFields}

        <div class="form-actions">
          <a href="departments.html" class="btn btn-ghost">Cancel</a>
          <button type="submit" class="btn btn-primary">Submit application</button>
        </div>
      </form>
    `;

    const form = document.getElementById("apply-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSubmit(form, dept);
    });
  }

  function setFieldError(fieldEl, isInvalid) {
    fieldEl.classList.toggle("invalid", isInvalid);
  }

  function handleSubmit(form, dept) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const regNo = form.regNo.value.trim().toUpperCase();
    const answers = dept.questions.map((_, i) => form[`q${i}`].value.trim());

    const regNoPattern = /^\d{2}[A-Z]{3}\d{4}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;

    let valid = true;

    const checks = [
      { field: "name", el: form.closest ? null : null, ok: name.length >= 2 },
      { field: "email", ok: emailPattern.test(email) },
      { field: "phone", ok: phonePattern.test(phone) },
      { field: "regNo", ok: regNoPattern.test(regNo) }
    ];

    checks.forEach(({ field, ok }) => {
      const fieldEl = form.querySelector(`[data-field="${field}"]`);
      setFieldError(fieldEl, !ok);
      if (!ok) valid = false;
    });

    answers.forEach((ans, i) => {
      const fieldEl = form.querySelector(`[data-field="q${i}"]`);
      const ok = ans.length >= 3;
      setFieldError(fieldEl, !ok);
      if (!ok) valid = false;
    });

    if (!valid) {
      const firstInvalid = form.querySelector(".field.invalid");
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const result = Store.submit({
      name,
      email,
      phone,
      regNo,
      department: dept.slug,
      departmentName: dept.name,
      answers
    });

    if (!result.ok) {
      showBanner(result.message);
      return;
    }

    showSuccess(dept);
  }

  function showBanner(message) {
    let banner = document.querySelector(".state-banner.error.dynamic");
    if (!banner) {
      banner = document.createElement("div");
      banner.className = "state-banner error dynamic";
      banner.innerHTML = `<div><strong>Couldn't submit that</strong><p class="msg"></p></div>`;
      document.getElementById("apply-form").before(banner);
    }
    banner.querySelector(".msg").textContent = message;
    banner.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showSuccess(dept) {
    root.innerHTML = `
      <div class="form-card success-card">
        <div class="icon-circle">✓</div>
        <h2>Application submitted</h2>
        <p>Your application to <strong>${dept.name}</strong> has been recorded. Leads review these directly — you'll hear back by email.</p>
        <div style="display:flex; gap:12px; justify-content:center;">
          <a href="departments.html" class="btn btn-ghost">Apply to another department</a>
          <a href="index.html" class="btn btn-primary">Back home</a>
        </div>
      </div>
    `;
  }
});
