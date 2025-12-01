
document.addEventListener("DOMContentLoaded", () => {
    const viewSelect = document.getElementById("history-select-view");
    const viewPlayback = document.getElementById("history-playback-view");

    const unidadSelect = document.getElementById("unidadSelect");
    const fechaDesde = document.getElementById("fechaDesde");
    const fechaHasta = document.getElementById("fechaHasta");
    const btnAplicar = document.getElementById("btnAplicar");

    const quickRangeButtons = document.querySelectorAll(".chip-range");
    const recentButtons = document.querySelectorAll(".recent-item");

    const playbackUnitTitle = document.getElementById("playbackUnitTitle");
    const playbackDateRange = document.getElementById("playbackDateRange");

    const btnBackFromSelect = document.getElementById("historyBackFromSelect");
    const btnBackFromPlayback = document.getElementById("historyBackFromPlayback");

    const btnToggleMetrics = document.getElementById("btnToggleMetrics");
    const metricsLabel = btnToggleMetrics?.querySelector(".metrics-label");
    const metricsPanel = document.getElementById("metricsPanel");

    const playPauseBtn = document.getElementById("btnPlayPause");
    const speedButtons = document.querySelectorAll(".chip-speed");


    function setQuickRange(range) {
        quickRangeButtons.forEach((btn) => {
            if (btn.dataset.range === range) {
                btn.classList.add("is-selected");
            } else {
                btn.classList.remove("is-selected");
            }
        });

        // Autocompletar fechas
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const dd = String(today.getDate()).padStart(2, "0");
        const hoyStr = `${yyyy}-${mm}-${dd}`;

        let from = hoyStr;
        let to = hoyStr;

        if (range === "ayer") {
            const ayer = new Date(today);
            ayer.setDate(today.getDate() - 1);
            const yyyyy = ayer.getFullYear();
            const mmm = String(ayer.getMonth() + 1).padStart(2, "0");
            const ddd = String(ayer.getDate()).padStart(2, "0");
            from = `${yyyyy}-${mmm}-${ddd}`;
            to = from;
        }

        if (range === "7dias") {
            const fromDt = new Date(today);
            fromDt.setDate(today.getDate() - 6);
            const yyyy2 = fromDt.getFullYear();
            const mm2 = String(fromDt.getMonth() + 1).padStart(2, "0");
            const dd2 = String(fromDt.getDate()).padStart(2, "0");
            from = `${yyyy2}-${mm2}-${dd2}`;
            to = hoyStr;
        }

        if (range === "turno") {
            from = hoyStr;
            to = hoyStr;
        }

        if (range === "personalizado") {
            return;
        }

        fechaDesde.value = from;
        fechaHasta.value = to;
    }

    function updateApplyState() {
        const unidadSelected = unidadSelect.value !== "";
        const hasDesde = fechaDesde.value !== "";
        const hasHasta = fechaHasta.value !== "";

        if (unidadSelected && hasDesde && hasHasta) {
            btnAplicar.disabled = false;
        } else {
            btnAplicar.disabled = true;
        }
    }

    function formatRangeForHeader(desde, hasta) {
        function pretty(dateStr) {
            if (!dateStr) return "";
            const [y, m, d] = dateStr.split("-");
            return `${d}/${m}/${y}`;
        }
        if (desde === hasta) {
            return `${pretty(desde)} 00:00 – 23:59`;
        }
        return `${pretty(desde)} – ${pretty(hasta)}`;
    }


    quickRangeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const range = btn.dataset.range;
            setQuickRange(range);
            updateApplyState();
        });
    });

    [unidadSelect, fechaDesde, fechaHasta].forEach((el) => {
        el.addEventListener("change", updateApplyState);
    });

    recentButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const unit = btn.dataset.unit;
            const range = btn.dataset.range;

            unidadSelect.value = unit;

            setQuickRange(range);

            updateApplyState();
        });
    });


    btnAplicar.addEventListener("click", () => {
        if (btnAplicar.disabled) return;

        const [placa, nombre] = unidadSelect.value.split("|");
        const rangoStr = formatRangeForHeader(fechaDesde.value, fechaHasta.value);

        playbackUnitTitle.textContent = `${placa} • ${nombre}`;
        playbackDateRange.textContent = rangoStr;

        viewSelect.hidden = true;
        viewPlayback.hidden = false;

        metricsPanel.classList.remove("is-visible");
        if (metricsLabel) metricsLabel.textContent = "Mostrar métricas";
    });

    btnBackFromSelect.addEventListener("click", () => {
        window.location.href = "variaciones-varias.html";
    });

    btnBackFromPlayback.addEventListener("click", () => {
        viewPlayback.hidden = true;
        viewSelect.hidden = false;
    });


    btnToggleMetrics.addEventListener("click", () => {
        const visible = metricsPanel.classList.toggle("is-visible");
        if (metricsLabel) {
            metricsLabel.textContent = visible ? "Ocultar métricas" : "Mostrar métricas";
        }
    });


    let isPlaying = false;

    playPauseBtn.addEventListener("click", () => {
        isPlaying = !isPlaying;
        playPauseBtn.textContent = isPlaying ? "❚❚" : "▷";
    });

    speedButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            speedButtons.forEach((b) => b.classList.remove("is-selected"));
            btn.classList.add("is-selected");
        });
    });
});
