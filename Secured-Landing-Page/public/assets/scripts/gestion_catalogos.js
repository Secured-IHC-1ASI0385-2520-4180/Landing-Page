

(function () {

    const screens = {
        main: document.getElementById("gc-screen-main"),
        newType: document.getElementById("gc-screen-new"),
        schedule: document.getElementById("gc-screen-schedule"),
    };

    function showScreen(name) {
        Object.values(screens).forEach((sc) =>
            sc.classList.remove("gc-screen--active")
        );
        if (screens[name]) screens[name].classList.add("gc-screen--active");
    }

    const gcBackToHome = document.getElementById("gcBackToHome");
    gcBackToHome.addEventListener("click", () => {
        window.location.href = "variaciones-varias.html";
    });


    const gcTabs = document.querySelectorAll(".gc-tab");
    gcTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            gcTabs.forEach((t) => t.classList.remove("gc-tab--active"));
            tab.classList.add("gc-tab--active");
        });
    });


    const gcNewTypeBtn = document.getElementById("gcNewTypeBtn");
    gcNewTypeBtn.addEventListener("click", () => {
        resetNewTypeForm();
        showScreen("newType");
    });


    const gcBackFromNew = document.getElementById("gcBackFromNew");
    const gcNewTypeForm = document.getElementById("gcNewTypeForm");
    const gcName = document.getElementById("gcName");
    const gcCode = document.getElementById("gcCode");
    const gcDescription = document.getElementById("gcDescription");
    const gcPriority = document.getElementById("gcPriority");
    const gcDraftBtn = document.getElementById("gcDraftBtn");
    const gcScheduleBtn = document.getElementById("gcScheduleBtn");

    gcBackFromNew.addEventListener("click", () => {
        showScreen("main");
    });

    function validateNewTypeForm() {
        const hasName = gcName.value.trim().length > 0;
        const hasCode = gcCode.value.trim().length > 0;
        const hasDesc = gcDescription.value.trim().length > 0;
        const hasPriority = gcPriority.value.trim().length > 0;

        const complete = hasName && hasCode && hasDesc && hasPriority;

        gcDraftBtn.disabled = !complete;
        gcScheduleBtn.disabled = !complete;
    }

    [gcName, gcCode, gcDescription, gcPriority].forEach((field) => {
        field.addEventListener("input", validateNewTypeForm);
        field.addEventListener("change", validateNewTypeForm);
    });

    function resetNewTypeForm() {
        gcNewTypeForm.reset();
        gcDraftBtn.disabled = true;
        gcScheduleBtn.disabled = true;
    }

    gcDraftBtn.addEventListener("click", () => {
        if (gcDraftBtn.disabled) return;
        resetNewTypeForm();
    });

    gcScheduleBtn.addEventListener("click", () => {
        if (gcScheduleBtn.disabled) return;

        const name = gcName.value.trim() || "—";
        const code = gcCode.value.trim() || "—";
        const priority = gcPriority.value.trim() || "—";

        const subtitle = document.getElementById("gcScheduleSubtitle");
        subtitle.textContent = `${name} (Versión 1)`;

        document.getElementById("gcSummaryName").textContent = name;
        document.getElementById("gcSummaryCode").textContent = code;
        document.getElementById("gcSummaryVersion").textContent = "v1";
        document.getElementById("gcSummaryPriority").textContent = priority;
        document.getElementById("gcSummaryFrom").textContent = "—";

        document.getElementById("gcDate").value = "";
        document.getElementById("gcTime").value = "";
        gcScheduleConfirmBtn.disabled = true;

        showScreen("schedule");
    });


    const gcBackFromSchedule = document.getElementById("gcBackFromSchedule");
    const gcScheduleBackBtn = document.getElementById("gcScheduleBackBtn");
    const gcScheduleConfirmBtn = document.getElementById("gcScheduleConfirmBtn");
    const gcDate = document.getElementById("gcDate");
    const gcTime = document.getElementById("gcTime");

    function goBackToNewFromSchedule() {
        showScreen("newType");
    }

    gcBackFromSchedule.addEventListener("click", goBackToNewFromSchedule);
    gcScheduleBackBtn.addEventListener("click", goBackToNewFromSchedule);

    function validateScheduleForm() {
        const hasDate = gcDate.value.trim().length > 0;
        const hasTime = gcTime.value.trim().length > 0;
        gcScheduleConfirmBtn.disabled = !(hasDate && hasTime);

        if (hasDate && hasTime) {
            document.getElementById("gcSummaryFrom").textContent =
                `${gcDate.value} ${gcTime.value}`;
        }
    }

    [gcDate, gcTime].forEach((field) => {
        field.addEventListener("input", validateScheduleForm);
        field.addEventListener("change", validateScheduleForm);
    });

    gcScheduleConfirmBtn.addEventListener("click", () => {
        if (gcScheduleConfirmBtn.disabled) return;
        showScreen("main");
    });


    showScreen("main");
})();
