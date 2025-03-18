const buttons = document.querySelectorAll('.adicionar');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalElemento = document.getElementById('total');
const finalizarCompra = document.getElementById('finalizar');

let carrinho = [];

const produtos = [
    { nome: "Pastel de Carne", preco: 6.00 },
    { nome: "Pastel de Frango", preco: 5.50 },
    { nome: "Pastel de Queijo", preco: 5.00 },
    { nome: "Coxinha", preco: 3.50 },
    { nome: "Empada de Frango", preco: 4.00 },
    { nome: "Refrigerante", preco: 3.00 }
];

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const quantidade = parseInt(document.getElementById(`quantidade${index + 1}`).value);
        if (quantidade > 0) {
            adicionarAoCarrinho(produtos[index], quantidade);
        }
    });
});

function adicionarAoCarrinho(produto, quantidade) {
    carrinho.push({ ...produto, quantidade });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
        const valorProduto = item.preco * item.quantidade;
        total += valorProduto;
        const li = document.createElement('li');
        li.textContent = `${item.nome} x ${item.quantidade} - R$ ${item.preco.toFixed(2)} = R$ ${valorProduto.toFixed(2)}`;
        listaCarrinho.appendChild(li);
    });

    totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
}

finalizarCompra.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let detalhes = "Resumo da Compra:\n";
    carrinho.forEach(item => {
        const valorProduto = item.preco * item.quantidade;
        detalhes += `${item.nome} x ${item.quantidade} = R$ ${valorProduto.toFixed(2)}\n`;
    });

    let totalCompra = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    const adicionarTaxa = confirm("Deseja adicionar uma taxa de 10% ao valor final?");
    if (adicionarTaxa) {
        const taxa = totalCompra * 0.10;
        totalCompra += taxa;
        detalhes += `Taxa de 10%: R$ ${(totalCompra * 0.10).toFixed(2)}\n`;
    }

    detalhes += `Total: R$ ${totalCompra.toFixed(2)}`;

    alert(detalhes);
});

document.getElementById('esvaziar-carrinho').addEventListener('click', esvaziarCarrinho);

function esvaziarCarrinho() {
    carrinho = []; 
    listaCarrinho.innerHTML = ''; 
    totalElemento.innerText = 'Total: R$ 0,00'; 
}