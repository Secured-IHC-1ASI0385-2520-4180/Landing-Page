function showView(id) {
    document
        .querySelectorAll(".view")
        .forEach((v) => v.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

// Cambiar entre tabs (información, historial)
function showTab(id) {
    document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
    document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.remove("active"));

    document
        .querySelector(`.tab[onclick="showTab('${id}')"]`)
        .classList.add("active");
    document.getElementById(id).classList.add("active");
}

