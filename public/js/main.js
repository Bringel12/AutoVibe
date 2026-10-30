
document.addEventListener("DOMContentLoaded", function() {

    // Exibe os veículos ao abrir a página
    renderizarCarros();

    // Menu mobile
    const botaoMenu = document.getElementById("menu-toggle");
    const navegacao = document.getElementById("nav");

    botaoMenu.addEventListener("click", function() {

        const aberto = navegacao.classList.toggle("open");

        botaoMenu.setAttribute("aria-expanded", aberto);

        botaoMenu.textContent = aberto ? "✕" : "☰";
    });

    // Fecha o menu ao clicar em um link
    navegacao.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", function() {

            navegacao.classList.remove("open");

            botaoMenu.setAttribute("aria-expanded", "false");

            botaoMenu.textContent = "☰";
        });

    });

});
