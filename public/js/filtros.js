
const formularioBusca = document.getElementById("search-form");

formularioBusca.addEventListener("submit", function(event) {

    event.preventDefault();

    const marca = document.getElementById("marca").value;
    const preco = document.getElementById("preco").value;
    const cidade = document.getElementById("cidade").value
        .trim()
        .toLowerCase();

    const resultado = carros.filter(carro => {

        const correspondeMarca =
            !marca || carro.marca === marca;

        const correspondePreco =
            !preco || carro.preco <= Number(preco);

        const correspondeCidade =
            !cidade || carro.cidade.toLowerCase().includes(cidade);

        return (
            correspondeMarca &&
            correspondePreco &&
            correspondeCidade
        );
    });

    renderizarCarros(resultado);

    document.getElementById("veiculos").scrollIntoView({
        behavior: "smooth"
    });
});
