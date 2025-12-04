document.addEventListener("DOMContentLoaded", () => {
    /* ===== Referencias generales ===== */
    const mainView = document.getElementById("bit-main-view");
    const exportView = document.getElementById("bit-export-view");

    const backBtn = document.getElementById("bitBackBtn");
    const exportBtn = document.getElementById("bitExportBtn");
    const searchBtn = document.getElementById("bitSearchBtn");
    const newEntryBtn = document.getElementById("bitNewEntryBtn");

    const exportBackBtn = document.getElementById("bitExportBackBtn");
    const generatePdfBtn = document.getElementById("bitGeneratePdfBtn");

    const filterButtons = Array.from(
        document.querySelectorAll(".bit-filter-pill")
    );
    const resetFiltersBtn = document.getElementById("bitResetFiltersBtn");
    const entryCards = Array.from(
        document.querySelectorAll(".bit-entry-card")
    );
    const counter = document.getElementById("bitEntriesCounter");

    const totalEntries = entryCards.length;

    /* ===== Helpers de vista ===== */

    function showView(name) {
        if (name === "main") {
            mainView.classList.add("bit-view-active");
            exportView.classList.remove("bit-view-active");
            // Siempre que regresamos a la bitácora, recalculamos el contador
            updateCounter(getVisibleCount());
        } else if (name === "export") {
            exportView.classList.add("bit-view-active");
            mainView.classList.remove("bit-view-active");
        }
    }

    /* ===== Navegación ===== */

    // Flecha back de Bitácora (puedes cambiar a home-policia.html si quieres fijo)
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.history.back();
        });
    }

    // Ir a vista Exportar
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            showView("export");
        });
    }

    // Volver desde Exportar a Bitácora
    if (exportBackBtn) {
        exportBackBtn.addEventListener("click", () => {
            showView("main");
        });
    }

    // Búsqueda simulada
    if (searchBtn) {
        searchBtn.addEventListener("click", () => {
            alert("Búsqueda en bitácora (simulada).\nEn producción aquí iría el buscador.");
        });
    }

    // Nueva entrada simulada
    if (newEntryBtn) {
        newEntryBtn.addEventListener("click", () => {
            alert("Acción 'Nueva entrada' simulada.\nEn la app real se abriría un formulario.");
        });
    }

    // Generar PDF (simulado) y regresar a la bitácora 7/7
    if (generatePdfBtn) {
        generatePdfBtn.addEventListener("click", () => {
            generatePdfBtn.disabled = true;
            const originalText = generatePdfBtn.textContent;
            generatePdfBtn.textContent = "Generando PDF...";

            setTimeout(() => {
                alert("PDF de la bitácora generado (simulado).");
                generatePdfBtn.disabled = false;
                generatePdfBtn.textContent = originalText;

                // Al terminar, regresamos a la bitácora con todos los filtros limpios (7/7)
                clearFilters();
                showView("main");
            }, 1000);
        });
    }

    /* ===== Filtros ===== */

    function updateCounter(count) {
        counter.textContent = `Mostrando ${count} de ${totalEntries} entradas`;
    }

    function getVisibleCount() {
        return entryCards.filter(card => !card.hidden).length;
    }

    function applyFilters() {
        const activeTags = filterButtons
            .filter(btn => btn.classList.contains("is-active"))
            .map(btn => btn.dataset.tag);

        if (activeTags.length > 0) {
            resetFiltersBtn.hidden = false;
        } else {
            resetFiltersBtn.hidden = true;
        }

        if (activeTags.length === 0) {
            entryCards.forEach(card => {
                card.hidden = false;
            });
            updateCounter(totalEntries);
            return;
        }

        let visibleCount = 0;

        entryCards.forEach(card => {
            const tags = (card.dataset.tags || "")
                .split(",")
                .map(t => t.trim());

            const matches = activeTags.some(tag => tags.includes(tag));
            card.hidden = !matches;
            if (matches) visibleCount++;
        });

        updateCounter(visibleCount);
    }

    function clearFilters() {
        filterButtons.forEach(btn => btn.classList.remove("is-active"));
        entryCards.forEach(card => { card.hidden = false; });
        updateCounter(totalEntries);
        resetFiltersBtn.hidden = true;
    }

    // Click en chips
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("is-active");
            applyFilters();
        });
    });

    // Limpiar todo
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => {
            clearFilters();
        });
    }

    // Estado inicial
    updateCounter(totalEntries);
});
