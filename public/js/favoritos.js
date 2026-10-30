
function obterFavoritos() {

    return JSON.parse(
        localStorage.getItem("autovendas_favoritos")
    ) || [];
}


function salvarFavoritos(favoritos) {

    localStorage.setItem(
        "autovendas_favoritos",
        JSON.stringify(favoritos)
    );
}


function isFavorito(id) {

    return obterFavoritos().includes(Number(id));
}


function alternarFavorito(id) {

    let favoritos = obterFavoritos();

    id = Number(id);

    if (favoritos.includes(id)) {

        favoritos = favoritos.filter(item => item !== id);

    } else {

        favoritos.push(id);

    }

    salvarFavoritos(favoritos);

    return favoritos;
}


// Evento de clique nos favoritos
document.getElementById("vehicles-grid").addEventListener(
    "click",
    function(event) {

        const botao = event.target.closest("[data-favorite]");

        if (!botao) return;

        const id = Number(botao.dataset.favorite);

        alternarFavorito(id);

        // Atualiza os cards preservando os resultados atuais
        const cards = Array.from(
            document.querySelectorAll(".vehicle-card h3")
        );

        const idsVisiveis = cards
            .map(card => card.closest(".vehicle-card"))
            .map(card => {
                const link = card.querySelector(".vehicle-price a");
                return Number(new URL(link.href).searchParams.get("id"));
            });

        const listaVisivel = carros.filter(carro =>
            idsVisiveis.includes(carro.id)
        );

        renderizarCarros(listaVisivel);
    }
);
