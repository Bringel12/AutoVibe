
/* =====================================
   DETALHES DO VEÍCULO
===================================== */

const vehicleDetail = document.getElementById("vehicle-detail");

const parametros = new URLSearchParams(window.location.search);
const idVeiculo = Number(parametros.get("id"));

const carro = carros.find(function (item) {
    return item.id === idVeiculo;
});


/* =====================================
   FAVORITOS
===================================== */

function obterFavoritos() {
    return JSON.parse(localStorage.getItem("autovendas_favoritos")) || [];
}

function salvarFavoritos(favoritos) {
    localStorage.setItem(
        "autovendas_favoritos",
        JSON.stringify(favoritos)
    );
}

function alternarFavorito(id) {

    let favoritos = obterFavoritos();

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(function (item) {
            return item !== id;
        });
    } else {
        favoritos.push(id);
    }

    salvarFavoritos(favoritos);

    const botao = document.getElementById("favorite-detail");

    if (botao) {
        botao.classList.toggle("active", favoritos.includes(id));
        botao.textContent = favoritos.includes(id) ? "♥ Favoritado" : "♡ Favoritar";
    }
}


/* =====================================
   GALERIA DE IMAGENS
===================================== */

function alterarImagem(indice) {

    const imagemPrincipal = document.getElementById("main-vehicle-image");
    const contador = document.getElementById("gallery-counter");

    const miniaturas = document.querySelectorAll(".detail-thumbnail");

    if (!imagemPrincipal || !carro) return;

    const fotos = carro.fotos && carro.fotos.length
        ? carro.fotos
        : [carro.imagem];

    imagemPrincipal.src = fotos[indice];

    contador.textContent = `${indice + 1} / ${fotos.length}`;

    miniaturas.forEach(function (miniatura, index) {
        miniatura.classList.toggle("active", index === indice);
    });
}


/* =====================================
   COMPARTILHAR VEÍCULO
===================================== */

async function compartilharVeiculo() {

    const url = window.location.href;

    if (navigator.share) {

        try {
            await navigator.share({
                title: `${carro.marca} ${carro.modelo}`,
                text: "Confira este veículo no AutoVendas!",
                url: url
            });
        } catch (erro) {
            console.log("Compartilhamento cancelado.");
        }

    } else if (navigator.clipboard) {

        try {
            await navigator.clipboard.writeText(url);
            alert("Link copiado com sucesso!");
        } catch (erro) {
            prompt("Copie o link do veículo:", url);
        }

    } else {
        prompt("Copie o link do veículo:", url);
    }
}


/* =====================================
   RENDERIZAR DETALHES
===================================== */

function renderizarDetalhes() {

    if (!carro) {

        vehicleDetail.innerHTML = `
            <div class="error-message">
                <h2>Veículo não encontrado</h2>
                <p>O anúncio que você procura não está disponível.</p>
                <br>
                <a href="../index.html#veiculos" class="btn btn-primary">
                    Voltar aos veículos
                </a>
            </div>
        `;

        return;
    }

    const fotos = carro.fotos && carro.fotos.length
        ? carro.fotos
        : [carro.imagem];

    const favoritos = obterFavoritos();
    const favoritado = favoritos.includes(carro.id);

    const vendedor = carro.vendedor || {
        nome: "Vendedor",
        tipo: "Vendedor particular",
        telefone: ""
    };

    const telefone = vendedor.telefone
        ? vendedor.telefone.replace(/\D/g, "")
        : "";

    const mensagem = encodeURIComponent(
        `Olá! Tenho interesse no veículo ${carro.marca} ${carro.modelo}.`
    );

    const linkWhatsApp = telefone
        ? `https://wa.me/${telefone}?text=${mensagem}`
        : "#";

    const relacionados = carros
        .filter(function (item) {
            return item.id !== carro.id &&
                item.categoria === carro.categoria;
        })
        .slice(0, 3);

    vehicleDetail.innerHTML = `

        <div class="detail-heading">

            <div>
                <h1>${carro.marca} ${carro.modelo}</h1>

                <p>
                    ${carro.versao} • ${carro.cidade}
                </p>
            </div>

            <div class="detail-actions">

                <button
                    class="detail-action-btn ${favoritado ? "active" : ""}"
                    id="favorite-detail"
                    onclick="alternarFavorito(${carro.id})">

                    ${favoritado ? "♥ Favoritado" : "♡ Favoritar"}

                </button>

                <button
                    class="detail-action-btn"
                    onclick="compartilharVeiculo()">

                    ↗ Compartilhar

                </button>

            </div>

        </div>


        <!-- GALERIA -->

        <div class="detail-gallery">

            <div class="detail-main-image">

                <img
                    src="${fotos[0]}"
                    alt="${carro.marca} ${carro.modelo}"
                    id="main-vehicle-image"
                >

                <span class="gallery-counter" id="gallery-counter">
                    1 / ${fotos.length}
                </span>

            </div>

            <div class="detail-thumbnails">

                ${fotos.map(function (foto, index) {

                    return `
                        <button
                            class="detail-thumbnail ${index === 0 ? "active" : ""}"
                            onclick="alterarImagem(${index})">

                            <img src="${foto}" alt="Foto ${index + 1}">

                        </button>
                    `;

                }).join("")}

            </div>

        </div>


        <!-- INFORMAÇÕES E VENDEDOR -->

        <div class="detail-content-grid">

            <div class="detail-main-content">


                <!-- FICHA TÉCNICA -->

                <div class="detail-card">

                    <h2>Ficha técnica</h2>

                    <div class="specifications-grid">

                        <div class="specification-item">
                            <span>Marca</span>
                            <strong>${carro.marca}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Modelo</span>
                            <strong>${carro.modelo}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Ano</span>
                            <strong>${carro.ano}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Quilometragem</span>
                            <strong>${Number(carro.km).toLocaleString("pt-BR")} km</strong>
                        </div>

                        <div class="specification-item">
                            <span>Câmbio</span>
                            <strong>${carro.cambio}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Combustível</span>
                            <strong>${carro.combustivel}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Categoria</span>
                            <strong>${carro.categoria}</strong>
                        </div>

                        <div class="specification-item">
                            <span>Localização</span>
                            <strong>${carro.cidade}</strong>
                        </div>

                    </div>

                </div>


                <!-- DESCRIÇÃO -->

                <div class="detail-card">

                    <h2>Descrição do veículo</h2>

                    <p class="detail-description">
                        ${carro.descricao || "O vendedor ainda não adicionou uma descrição para este veículo."}
                    </p>

                </div>

            </div>


            <!-- PAINEL DO VENDEDOR -->

            <aside class="seller-panel">

                <p class="seller-price">
                    ${formatarPreco(carro.preco)}
                </p>

                <div class="seller-information">

                    <div class="seller-avatar">
                        ${vendedor.nome.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h3>${vendedor.nome}</h3>
                        <p>${vendedor.tipo}</p>
                    </div>

                </div>

                <div class="seller-contact">

                    ${telefone ? `
                        <a
                            href="${linkWhatsApp}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn whatsapp-btn">

                            Conversar pelo WhatsApp

                        </a>
                    ` : `
                        <p class="seller-note">
                            O vendedor ainda não informou um telefone para contato.
                        </p>
                    `}

                    <a href="../index.html#veiculos" class="btn btn-primary">
                        Ver outros veículos
                    </a>

                </div>

                <p class="seller-note">
                    Confira todas as informações do veículo antes de fechar negócio.
                </p>

            </aside>

        </div>


        <!-- VEÍCULOS RELACIONADOS -->

        ${relacionados.length ? `

            <section class="related-section">

                <h2>Você também pode gostar</h2>

                <div class="related-grid">

                    ${relacionados.map(function (item) {

                        return `
                            <article class="vehicle-card">

                                <div class="vehicle-image">

                                    <img
                                        src="${item.imagem}"
                                        alt="${item.marca} ${item.modelo}"
                                    >

                                </div>

                                <div class="vehicle-info">

                                    <h3>${item.marca} ${item.modelo}</h3>

                                    <p class="vehicle-version">
                                        ${item.versao}
                                    </p>

                                    <div class="vehicle-details">
                                        <span>${item.ano}</span>
                                        <span>${Number(item.km).toLocaleString("pt-BR")} km</span>
                                        <span>${item.cambio}</span>
                                    </div>

                                    <div class="vehicle-price">

                                        <strong>
                                            ${formatarPreco(item.preco)}
                                        </strong>

                                        <a href="detalhes.html?id=${item.id}">
                                            Ver detalhes →
                                        </a>

                                    </div>

                                </div>

                            </article>
                        `;

                    }).join("")}

                </div>

            </section>

        ` : ""}

    `;
}


/* =====================================
   INICIALIZAÇÃO
===================================== */

renderizarDetalhes();
