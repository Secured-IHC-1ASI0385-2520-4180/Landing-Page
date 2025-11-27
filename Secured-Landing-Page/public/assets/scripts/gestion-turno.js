// Lógica de la sección "Gestión de turno"

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("view-turno-modal");
    const btnOpenModal = document.getElementById("gtBtnOpenModal");
    const btnCloseModal = document.getElementById("gtBtnCloseModal");
    const btnStartShift = document.getElementById("gtBtnStartShift");
    const statusText = document.getElementById("gtStatusText");
    const serviceList = document.getElementById("gtServiceList");
    const serviceError = document.getElementById("gtServiceError");

    let selectedService = null;

    // Abrir modal
    btnOpenModal.addEventListener("click", () => {
        selectedService = null;
        clearSelection();
        serviceError.textContent = "";
        overlay.classList.add("gt-open");
        overlay.setAttribute("aria-hidden", "false");
    });

    // Cerrar modal
    btnCloseModal.addEventListener("click", closeModal);

    // Cerrar si se hace click fuera del contenido
    overlay.addEventListener("click", (evt) => {
        if (evt.target === overlay) {
            closeModal();
        }
    });

    function closeModal() {
        overlay.classList.remove("gt-open");
        overlay.setAttribute("aria-hidden", "true");
    }

    function clearSelection() {
        const options = overlay.querySelectorAll(".gt-service-option");
        options.forEach(opt => opt.classList.remove("gt-selected"));
    }

    // Selección de tipo de servicio
    serviceList.addEventListener("click", (evt) => {
        const option = evt.target.closest(".gt-service-option");
        if (!option) return;

        clearSelection();
        option.classList.add("gt-selected");
        selectedService = option.getAttribute("data-service");
        serviceError.textContent = "";
    });

    // Confirmar inicio de turno
    btnStartShift.addEventListener("click", () => {
        if (!selectedService) {
            serviceError.textContent = "Selecciona un tipo de servicio para iniciar turno.";
            return;
        }

        // Actualizamos el estado en la tarjeta principal
        statusText.textContent = `Disponible · ${selectedService}`;

        // Cerramos el modal y dejamos todo listo
        closeModal();
    });
});
