let cardContainer = document.querySelector(".card-container");
let dados = [];

async function iniciarBusca() {
    // Seleciona a mensagem de boas-vindas e a esconde
    const welcomeMessage = document.getElementById('welcome-message');
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }

    // Se os dados ainda não foram carregados, busca do JSON
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Pega o valor do campo de busca e converte para minúsculas
    let termoBusca = document.querySelector('input[type="text"]').value.toLowerCase();

    // Filtra os dados com base no nome ou ano/data_criacao
    let dadosFiltrados = dados.filter(dado => {
        const anoOuData = dado.ano || dado.data_criacao; // Pega o ano ou a data de criação
        const nomeMatch = dado.nome.toLowerCase().includes(termoBusca);
        const anoMatch = anoOuData && anoOuData.toString().includes(termoBusca); // Verifica se ano/data existe antes de converter
        return nomeMatch || anoMatch;
    });

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards
    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>
                ${dado.logo ? `<img src="${dado.logo}" alt="Logo ${dado.nome}" class="brand-logo">` : ''}
                <span>${dado.nome}</span>
            </h2>
            <p>${dado.ano || dado.data_criacao}</p>
            <p>${dado.descricao}</p> 
            <a href="${dado.link}" target="_blank">Saiba mais sobre a historia da ${dado.nome}</a>
        `;
        cardContainer.appendChild(article);
    }
}