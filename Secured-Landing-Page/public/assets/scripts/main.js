document.addEventListener("DOMContentLoaded", () => {
  /*  COMPORTAMIENTO EN index.html-*/

  const howItWorksBtn = document.querySelector(".btn-secondary.hero-btn-secondary");
  if (howItWorksBtn) {
    howItWorksBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const target =
        document.querySelector("#seguridad") || document.querySelector("#mapa");
      if (!target) return;

      const top = target.offsetTop - 80;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  /* 2) FLUJO DE AUTENTICACIÓN EN policia-login.html*/

  const loginPage = document.querySelector(".login-page");
  if (loginPage) {
    // ---------- Referencias a pasos ----------
    const steps = {
      login: document.getElementById("step-login"),
      recover: document.getElementById("step-recover"),
      code:
        document.getElementById("step-code") ||
        document.getElementById("step-verify"),
      newPassword: document.getElementById("step-new-password"),
      success: document.getElementById("step-success"),
    };

    function showStep(name) {
      Object.keys(steps).forEach((key) => {
        const step = steps[key];
        if (!step) return;
    
        step.classList.toggle("auth-step--active", key === name);
      });

      
      const card = loginPage.querySelector(".auth-card");
      const offsetTop = card ? card.offsetTop - 80 : loginPage.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }

    // Login - Recuperar contraseña 
    const linkForgot = document.getElementById("link-forgot");
    if (linkForgot) {
      linkForgot.addEventListener("click", (e) => {
        e.preventDefault();
        showStep("recover");
      });
    }

    // Botones "Volver"
    loginPage.querySelectorAll(".auth-back-link").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = btn.dataset.target;
        if (target && steps[target]) {
          showStep(target);
        }
      });
    });

    // Recuperar - Código de verificación
    const btnSendCode = document.getElementById("btn-send-code");
    if (btnSendCode) {
      const emailInput = document.getElementById("recover-email");
      const emailDisplay = document.getElementById("verify-email");

      btnSendCode.addEventListener("click", (e) => {
        e.preventDefault();

        const email =
          (emailInput && emailInput.value.trim()) ||
          "user@institucional.gob.pe";

        if (emailDisplay) {
          emailDisplay.textContent = email;
        }

        alert(
          "Se ha enviado un código de verificación (simulado) a " + email
        );
        showStep("code");
      });
    }

    // Manejo de inputs del código 
    const codeInputs = loginPage.querySelectorAll(".code-input");

    if (codeInputs.length) {
      codeInputs.forEach((input, index) => {
        input.addEventListener("input", () => {
          // Solo números
          input.value = input.value.replace(/\D/g, "");

          // Si tiene algo, saltar al siguiente
          if (input.value && index < codeInputs.length - 1) {
            codeInputs[index + 1].focus();
          }
        });

        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && index > 0) {
            codeInputs[index - 1].focus();
          }
        });
      });
    }

    //  Código -> Nueva contraseña 
    const btnVerifyCode = document.getElementById("btn-verify-code");
    if (btnVerifyCode) {
      btnVerifyCode.addEventListener("click", (e) => {
        e.preventDefault();

        const code = Array.from(codeInputs).map((i) => i.value).join("");
        if (code.length === codeInputs.length && code !== "".repeat(codeInputs.length)) {
          showStep("newPassword");
        } else {
          alert("Completa los dígitos del código de verificación.");
        }
      });
    }

    // Nueva contraseña: validación + Guardar 
    const pwdInput = document.getElementById("new-password");
    const pwdConfirmInput = document.getElementById("confirm-password");
    const savePwdBtn = document.getElementById("btn-save-password");

    const ruleElements = {
      length: loginPage.querySelector('[data-rule="length"]'),
      upper: loginPage.querySelector('[data-rule="upper"]'),
      lower: loginPage.querySelector('[data-rule="lower"]'),
      number: loginPage.querySelector('[data-rule="number"]'),
      special: loginPage.querySelector('[data-rule="special"]'),
    };

    function setRuleState(el, ok) {
      if (!el) return;
      el.classList.toggle("rule-ok", ok);
      const icon = el.querySelector(".rule-icon");
      if (icon) icon.textContent = ok ? "✔" : "✖";
    }

    function validatePasswords() {
      const value = pwdInput ? pwdInput.value : "";

      const checks = {
        length: value.length >= 8,
        upper: /[A-ZÁÉÍÓÚÑ]/.test(value),
        lower: /[a-záéíóúñ]/.test(value),
        number: /\d/.test(value),
        special: /[^A-Za-z0-9]/.test(value),
      };

      Object.keys(checks).forEach((key) => {
        setRuleState(ruleElements[key], checks[key]);
      });

      const match =
        pwdConfirmInput &&
        pwdConfirmInput.value &&
        value === pwdConfirmInput.value;

      if (savePwdBtn) {
        savePwdBtn.disabled = !(
          Object.values(checks).every(Boolean) && match
        );
      }
    }

    if (pwdInput) pwdInput.addEventListener("input", validatePasswords);
    if (pwdConfirmInput)
      pwdConfirmInput.addEventListener("input", validatePasswords);


    if (savePwdBtn) {
      savePwdBtn.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Contraseña actualizada (simulado). Ahora puedes iniciar sesión.");
        showStep("login");
      });
    }

    // Botón "Iniciar sesión
    const btnGoLogin = document.getElementById("btn-go-login");
    if (btnGoLogin) {
      btnGoLogin.addEventListener("click", (e) => {
        e.preventDefault();
        showStep("login");
      });
    }

    //  Selector de rol: Serenazgo / Policía
    const roleButtons = loginPage.querySelectorAll(".role-strip-link");
    const rolInput = document.getElementById("rol");

    if (roleButtons.length && rolInput) {
      roleButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          roleButtons.forEach((b) =>
            b.classList.remove("role-strip-link--active")
          );
          btn.classList.add("role-strip-link--active");
          rolInput.value = btn.dataset.role || "";
        });
      });
    }
  }
});
