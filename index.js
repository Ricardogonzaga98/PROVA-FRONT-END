const inputItem = document.getElementById('input-item');
const inputPreco = document.getElementById('input-preco');
const inputQuantidade = document.getElementById('input-quantidade');
const botaoAdicionar = document.getElementById('adicionar-item');
const listaDeCompras = document.getElementById('lista-de-compras');
const mensagemListaVazia = document.querySelector('.mensagem-lista-vazia');
const totalValor = document.getElementById('total-valor');
const formularioAdicionarItem = document.getElementById('form-adicionar-item');

let listaItens = [];

function atualizarLista() {
    listaDeCompras.innerHTML = '';
    let total = 0;

    if (listaItens.length === 0) {
        mensagemListaVazia.style.display = 'block';
    } else {
        mensagemListaVazia.style.display = 'none';
        listaItens.forEach((item, index) => {
            const novoItem = document.createElement('li');
            novoItem.innerHTML = `
                <span>${item.nome}</span>
                <span>R$ ${item.preco.toFixed(2)} x ${item.quantidade}</span>
                <span>= R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                <button class="botao-remover" data-index="${index}">Remover</button>
            `;
            listaDeCompras.appendChild(novoItem);
            total += item.preco * item.quantidade;
        });

        const botoesRemover = document.querySelectorAll('.botao-remover');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', function() {
                const indexParaRemover = parseInt(this.dataset.index);
                removerItem(indexParaRemover);
            });
        });
    }

    totalValor.textContent = `R$ ${total.toFixed(2)}`;
}

function adicionarItem() {
    const nome = inputItem.value.trim();
    const preco = parseFloat(inputPreco.value);
    const quantidade = parseInt(inputQuantidade.value);

    if (nome && !isNaN(preco) && !isNaN(quantidade) && preco > 0 && quantidade > 0) {
        listaItens.push({ nome, preco, quantidade });
        inputItem.value = '';
        inputPreco.value = '';
        inputQuantidade.value = '1';
        atualizarLista();
    } else {
        alert('Por favor, digite um nome válido, um preço maior que zero e uma quantidade válida.');
    }
}

function removerItem(index) {
    listaItens.splice(index, 1);
    atualizarLista();
}

botaoAdicionar.addEventListener('click', adicionarItem);
formularioAdicionarItem.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário
    adicionarItem();
});

atualizarLista(); // Carrega a lista inicial (se houver algo salvo localmente, por exemplo)