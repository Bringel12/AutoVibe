
const carros = [
    {
        id: 1,
        marca: "Toyota",
        modelo: "Corolla",
        versao: "2.0 XEi Flex Automático",
        ano: 2022,
        km: 35000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 135900,
        cidade: "Blumenau - SC",
        categoria: "Sedã",
        imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80",
        destaque: "Destaque"
    },
    {
        id: 2,
        marca: "Volkswagen",
        modelo: "T-Cross",
        versao: "1.0 200 TSI Comfortline",
        ano: 2023,
        km: 22000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 124900,
        cidade: "Blumenau - SC",
        categoria: "SUV",
        imagem: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80",
        destaque: "Seminovo"
    },
    {
        id: 3,
        marca: "Chevrolet",
        modelo: "Onix",
        versao: "1.0 Turbo LTZ",
        ano: 2022,
        km: 28000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 82900,
        cidade: "Gaspar - SC",
        categoria: "Hatch",
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80",
        destaque: "Oportunidade"
    },
    {
        id: 4,
        marca: "Honda",
        modelo: "Civic",
        versao: "2.0 EXL Flex",
        ano: 2021,
        km: 42000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 119900,
        cidade: "Indaial - SC",
        categoria: "Sedã",
        imagem: "https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?auto=format&fit=crop&w=800&q=80",
        destaque: "Destaque"
    },
    {
        id: 5,
        marca: "Hyundai",
        modelo: "HB20",
        versao: "1.0 TGDI Platinum",
        ano: 2023,
        km: 18000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 89900,
        cidade: "Blumenau - SC",
        categoria: "Hatch",
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
        destaque: "Seminovo"
    },
    {
        id: 6,
        marca: "Fiat",
        modelo: "Pulse",
        versao: "1.0 Turbo Audace",
        ano: 2023,
        km: 15000,
        cambio: "Automático",
        combustivel: "Flex",
        preco: 104900,
        cidade: "Timbó - SC",
        categoria: "SUV",
        imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        destaque: "Oportunidade"
    }
];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });
}

function renderizarCarros(lista = carros) {

    const container = document.getElementById("vehicles-grid");
    const mensagem = document.getElementById("empty-message");

    if (!container) return;

    container.innerHTML = "";

    if (lista.length === 0) {
        mensagem.hidden = false;
        return;
    }

    mensagem.hidden = true;

    lista.forEach(carro => {

        const favorito = typeof isFavorito === "function"
            ? isFavorito(carro.id)
            : false;

        const card = document.createElement("article");

        card.className = "vehicle-card";

        card.innerHTML = `
            <div class="vehicle-image">

                <img
                    src="${carro.imagem}"
                    alt="${carro.marca} ${carro.modelo}"
                    loading="lazy"
                >

                <span class="vehicle-badge">
                    ${carro.destaque}
                </span>

                <button
                    class="favorite-btn ${favorito ? "active" : ""}"
                    data-favorite="${carro.id}"
                    aria-label="Adicionar aos favoritos"
                    aria-pressed="${favorito}"
                >
                    ${favorito ? "♥" : "♡"}
                </button>

            </div>

            <div class="vehicle-info">

                <h3>${carro.marca} ${carro.modelo}</h3>

                <p class="vehicle-version">
                    ${carro.versao}
                </p>

                <div class="vehicle-details">
                    <span>📅 ${carro.ano}</span>
                    <span>🛣️ ${carro.km.toLocaleString("pt-BR")} km</span>
                    <span>⚙️ ${carro.cambio}</span>
                    <span>⛽ ${carro.combustivel}</span>
                </div>

                <div class="vehicle-price">

                    <strong>${formatarPreco(carro.preco)}</strong>

                    <a href="pages/detalhes.html?id=${carro.id}">
                        Ver detalhes →
                    </a>

                </div>

                <p class="vehicle-version" style="margin-top: 12px;">
                    📍 ${carro.cidade}
                </p>

            </div>
        `;

        container.appendChild(card);
    });
}
