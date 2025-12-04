const btn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

// Toggle del menú lateral
btn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

