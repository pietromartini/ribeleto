
function myFunction() {
    document.body.classList.toggle("dark-mode");
    document.documentElement.classList.toggle("dark-mode");
    
    const blocosCadastro = document.querySelectorAll('.cadastro-all, .text-card, #perfil-form');
    blocosCadastro.forEach(bloco => {
        bloco.classList.toggle("dark-mode");
    });

    const campoBusca = document.getElementById('campo-busca');
    if (campoBusca) {
        campoBusca.classList.toggle("input-busca");
    }
}

function inicializarBaseLocal() {
    if (!localStorage.getItem('Base_Produtos')) {
        const produtosCardapio = [
            { id: 1, nome: "Pizza Grande de Frango com Catupiry", preco: 64.99 },
            { id: 2, nome: "Pizza Grande de Calabresa", preco: 81.99 },
            { id: 5, nome: "Heineken 330ml", preco: 7.99 },
            { id: 6, nome: "Guaraná Antártica 2l", preco: 11.98 },
            { id: 7, nome: "Água com gás 500ml", preco: 1.99 },
            { id: 9, nome: "Pizza Grande de Margherita com Guaraná de 1.5L", preco: 103.98 },
            { id: 10, nome: "2 Pizzas Grandes com Direito a um Guaraná de 2L", preco: 179.99 },
            { id: 11, nome: "Pizza Grande de Morango com Chocolate", preco: 81.99 }
        ];
        localStorage.setItem('Base_Produtos', JSON.stringify(produtosCardapio));
    }
    if (!localStorage.getItem('Base_Pedidos')) localStorage.setItem('Base_Pedidos', JSON.stringify([]));
    if (!localStorage.getItem('Base_Clientes')) localStorage.setItem('Base_Clientes', JSON.stringify([]));
    if (!localStorage.getItem('Base_Entregadores')) localStorage.setItem('Base_Entregadores', JSON.stringify([]));
}

const botoesAdicionar = document.querySelectorAll('.btn-carrinho');
botoesAdicionar.forEach(botao => {
    botao.addEventListener('click', () => {
        const nomeProd = botao.getAttribute('data-nome');
        const precoProd = parseFloat(botao.getAttribute('data-preco'));
        const imagemProd = botao.getAttribute('data-imagem');

        let carrinho = JSON.parse(localStorage.getItem('carrinhoProjetos')) || [];
        const itemExistente = carrinho.find(item => item.nome === nomeProd);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                nome: nomeProd,
                preco: precoProd,
                imagem: imagemProd,
                quantidade: 1
            });
        }
        localStorage.setItem('carrinhoProjetos', JSON.stringify(carrinho));
        alert(`${nomeProd} adicionado ao carrinho!`);
    });
});

const containerCarrinho = document.getElementById('itens-do-carrinho');
if (containerCarrinho) {
    function exibirCarrinho() {
        let carrinho = JSON.parse(localStorage.getItem('carrinhoProjetos')) || [];
        const elementoTotal = document.getElementById('total-carrinho');
        containerCarrinho.innerHTML = "";

        if (carrinho.length === 0) {
            containerCarrinho.innerHTML = "<p style='text-align:center; padding: 20px; margin-left:36vh;'>Seu carrinho está vazio! 🍕</p>";
            if (elementoTotal) elementoTotal.innerHTML = "Total do Pedido: R$ 0.00";
            return;
        }

        let somatoriaTotal = 0;

        carrinho.forEach(item => {
            const valorAcumuladoItem = item.preco * item.quantidade;
            
            somatoriaTotal += valorAcumuladoItem;

            const cardItem = document.createElement('div');
            cardItem.className = "text-card";
            cardItem.innerHTML = `
                <img src="${item.imagem || 'imgs/catupiry.png'}" class="photo-car">
                <p>${item.quantidade}x ${item.nome}</p>
                <p>R$ ${valorAcumuladoItem.toFixed(2)}</p>
            `;
            containerCarrinho.appendChild(cardItem);
        });

        if (elementoTotal) {
            elementoTotal.innerHTML = `Total do Pedido: R$ ${somatoriaTotal.toFixed(2)}`;
        }
    }
    exibirCarrinho();

    const btnLimpar = document.getElementById('btn-limpar-projeto');
    if (btnLimpar) {
        btnLimpar.addEventListener('click', () => {
            localStorage.removeItem('carrinhoProjetos');
            exibirCarrinho();
        });
    }
}


function aplicarMascarasCampos(idNome, idData, idCpf, idCep, idTel) {
    const nome = document.getElementById(idNome);
    const dataNasc = document.getElementById(idData);
    const cpf = document.getElementById(idCpf);
    const cep = document.getElementById(idCep);
    const telefone = document.getElementById(idTel);

    if (!nome) return;

    dataNasc.addEventListener('input', () => {
        let texto = dataNasc.value.replace(/\D/g, ""); 
        if (texto.length > 4) {
            dataNasc.value = texto.slice(0, 2) + '/' + texto.slice(2, 4) + '/' + texto.slice(4, 8);
        } else if (texto.length > 2) {
            dataNasc.value = texto.slice(0, 2) + '/' + texto.slice(2);
        } else {
            dataNasc.value = texto;
        }
    });

    cpf.addEventListener('input', () => {
        let texto = cpf.value.replace(/\D/g, "");
        if (texto.length > 9) {
            cpf.value = texto.slice(0, 3) + '.' + texto.slice(3, 6) + '.' + texto.slice(6, 9) + '-' + texto.slice(9, 11);
        } else if (texto.length > 6) {
            cpf.value = texto.slice(0, 3) + '.' + texto.slice(3, 6) + '.' + texto.slice(6);
        } else if (texto.length > 3) {
            cpf.value = texto.slice(0, 3) + '.' + texto.slice(3);
        } else {
            cpf.value = texto;
        }
    });

    cep.addEventListener('input', () => {
        let texto = cep.value.replace(/\D/g, "");
        if (texto.length > 5) {
            cep.value = texto.slice(0, 5) + '-' + texto.slice(5, 8);
        } else {
            cep.value = texto;
        }
    });

    telefone.addEventListener('input', () => {
        let texto = telefone.value.replace(/\D/g, "");
        if (texto.length > 10) {
            telefone.value = '(' + texto.slice(0, 2) + ') ' + texto.slice(2, 7) + '-' + texto.slice(7, 11);
        } else if (texto.length > 6) {
            telefone.value = '(' + texto.slice(0, 2) + ') ' + texto.slice(2, 6) + '-' + texto.slice(6);
        } else if (texto.length > 2) {
            telefone.value = '(' + texto.slice(0, 2) + ') ' + texto.slice(2);
        } else if (texto.length > 0) {
            telefone.value = '(' + texto;
        } else {
            telefone.value = texto;
        }
    });
}

const formCadastro = document.getElementById('cadastro-form');
if (formCadastro) {
    aplicarMascarasCampos('nome', 'data-nascimento', 'cpf', 'cep', 'telefone');
    formCadastro.addEventListener('submit', function(evento) {
        evento.preventDefault();
        alert("Cadastro feito com sucesso!");
        window.location.href = "login.html";
    });
}

const formPerfil = document.getElementById('perfil-form');
if (formPerfil) {
    aplicarMascarasCampos('perfil-nome', 'perfil-data-nascimento', 'perfil-cpf', 'perfil-cep', 'perfil-telefone');
    
    if (document.getElementById('perfil-nome')) {
        document.getElementById('perfil-nome').value = "Gabriel Medeiros";
        document.getElementById('perfil-data-nascimento').value = "10/11/1998";
        document.getElementById('perfil-cpf').value = "123.456.789-10";
        document.getElementById('perfil-cep').value = "01001-000";
        document.getElementById('perfil-telefone').value = "(11) 99999-1111";
    }

    formPerfil.addEventListener('submit', function(evento) {
        evento.preventDefault();
        alert("Alterações do perfil salvas com sucesso!");
    });
}

const formLogin = document.getElementById('login-form'); 
if (formLogin) {
    formLogin.addEventListener('submit', function(evento) {
        evento.preventDefault(); 
        alert("Login realizado com sucesso! Redirecionando...");
        window.location.href = "cardapio.html";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campo-busca');
    if (!campoBusca) return;

    if (window.location.pathname.includes('cardapio.html')) {
        const termoGuardado = sessionStorage.getItem('termoBuscado');
        if (termoGuardado) {
            campoBusca.value = termoGuardado;
            filtrarProdutosCardapio(termoGuardado);
            sessionStorage.removeItem('termoBuscado');
        }
        campoBusca.addEventListener('input', () => {
            filtrarProdutosCardapio(campoBusca.value);
        });
    } else {
        campoBusca.addEventListener('keypress', (evento) => {
            if (evento.key === 'Enter' && campoBusca.value.trim() !== "") {
                sessionStorage.setItem('termoBuscado', campoBusca.value.trim());
                window.location.href = 'cardapio.html';
            }
        });
    }
});

function filtrarProdutosCardapio(termo) {
    const termoNormalizado = termo.toLowerCase().trim();
    const cards = document.querySelectorAll('.card-pizzas');
    cards.forEach(card => {
        const infoProduto = card.querySelector('.pzz-info');
        if (infoProduto) {
            if (infoProduto.innerText.toLowerCase().includes(termoNormalizado)) {
                card.style.display = "block";
                } else {
                card.style.display = "none";
                }
                }
                });
                }
                



function mudarAbaAdmin(abaId) {
    document.querySelectorAll('.tab-section').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(abaId).classList.add('active');
}

function ejecutarRotinaImportacaoJSON() {
    const seletorArquivo = document.getElementById('input-arquivo-json');
    if (!seletorArquivo || !seletorArquivo.files.length) {
        alert("Selecione o arquivo JSON contendo os pedidos!");
        return;
    }
    const leitor = new FileReader();
    leitor.onload = function(evento) {
        try {
            const pedidosLidos = JSON.parse(evento.target.result);
            let pedidosAtuais = JSON.parse(localStorage.getItem('Base_Pedidos')) || [];
            pedidosLidos.forEach(novo => {
                if (!pedidosAtuais.some(p => p.id_pedido === novo.id_pedido)) {
                    pedidosAtuais.push(novo);
                }
            });
            localStorage.setItem('Base_Pedidos', JSON.stringify(pedidosAtuais));
            alert("Sucesso: JSON processado e registros salvos!");
            atualizarTabelaPedidosAdmin();
        } catch (erro) { 
            alert("Erro de leitura na estrutura do arquivo."); 
        }
    };
    leitor.readAsText(seletorArquivo.files[0]);
}

function atualizarTabelaPedidosAdmin() {
    const tabelaCorpo = document.getElementById('tabela-pedidos-corpo');
    const containerCliente = document.getElementById('historico-pedidos-cliente-dinamico');
    if (!tabelaCorpo) return;

    const pedidos = JSON.parse(localStorage.getItem('Base_Pedidos')) || [];
    tabelaCorpo.innerHTML = "";
    if (containerCliente) containerCliente.innerHTML = "";

    pedidos.forEach(pedido => {
        let stringItens = pedido.itens.map(i => `${i.quantidade}x ${i.produto_nome}`).join('<br>');
        tabelaCorpo.innerHTML += `
            <tr>
                <td>#${pedido.id_pedido}</td>
                <td>${pedido.cliente_nome}<br><small>${pedido.cliente_email}</small></td>
                <td>${stringItens}</td>
                <td>R$ ${pedido.total_pedido.toFixed(2)}</td>
                <td>
                    <select onchange="atualizarStatusPedidoBD(${pedido.id_pedido}, this.value)">
                        <option value="Pendente" ${pedido.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="Em Preparo" ${pedido.status === 'Em Preparo' ? 'selected' : ''}>Em Preparo</option>
                        <option value="Entregue" ${pedido.status === 'Entregue' ? 'selected' : ''}>Entregue</option>
                    </select>
                </td>
                <td><button onclick="removerPedidoBD(${pedido.id_pedido})" class="btn-acao btn-cancelar">Excluir</button></td>
            </tr>
        `;
        if (containerCliente) {
            containerCliente.innerHTML += `
                <p class="hist-text-two">Nova Carga Sincronizada</p>
                <div class="card-pedido">
                    <img src="imgs/ribeleto.png" class="beletopi"><p>Ribeleto (Pedido #${pedido.id_pedido} - <strong>Status: ${pedido.status}</strong>)</p>
                    <p>${stringItens}</p>
                    <p>Total: R$ ${pedido.total_pedido.toFixed(2)}</p>
                </div>
            `;
        }
    });
}

function atualizarStatusPedidoBD(id, novoStatus) {
    let pedidos = JSON.parse(localStorage.getItem('Base_Pedidos'));
    let p = pedidos.find(x => x.id_pedido === id);
    if (p) p.status = novoStatus;
    localStorage.setItem('Base_Pedidos', JSON.stringify(pedidos));
    atualizarTabelaPedidosAdmin();
}

function removerPedidoBD(id) {
    if (confirm("Deseja cancelar o pedido?")) {
        let pedidos = JSON.parse(localStorage.getItem('Base_Pedidos'));
        pedidos = pedidos.filter(x => x.id_pedido !== id);
        localStorage.setItem('Base_Pedidos', JSON.stringify(pedidos));
        atualizarTabelaPedidosAdmin();
    }
}

function atualizarTabelaProdutosAdmin() {
    const tabelaCorpo = document.getElementById('tabela-produtos-corpo');
    if (!tabelaCorpo) return;
    const produtos = JSON.parse(localStorage.getItem('Base_Produtos')) || [];
    tabelaCorpo.innerHTML = "";
    produtos.forEach(p => {
        tabelaCorpo.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td>
                    <button onclick="carregarFormAlterarProduto(${p.id}, '${p.nome}', ${p.preco})" class="btn-acao btn-salvar">Alterar</button>
                    <button onclick="removerProdutoBD(${p.id})" class="btn-acao btn-cancelar">Excluir</button>
                </td>
            </tr>`;
    });
}

function carregarFormAlterarProduto(id, nome, preco) {
    document.getElementById('form-edicao-produto').style.display = 'block';
    document.getElementById('edit-id-prod').value = id;
    document.getElementById('edit-nome-prod').value = nome;
    document.getElementById('edit-preco-prod').value = preco;
}

function fecharFormProduto() { document.getElementById('form-edicao-produto').style.display = 'none'; }

function confirmarAlteracaoProduto() {
    const id = parseInt(document.getElementById('edit-id-prod').value);
    let produtos = JSON.parse(localStorage.getItem('Base_Produtos'));
    let p = produtos.find(x => x.id === id);
    if (p) {
        p.nome = document.getElementById('edit-nome-prod').value;
        p.preco = parseFloat(document.getElementById('edit-preco-prod').value);
        localStorage.setItem('Base_Produtos', JSON.stringify(produtos));
        fecharFormProduto();
        atualizarTabelaProdutosAdmin();
    }
}

function removerProdutoBD(id) {
    if (confirm("Remover este produto?")) {
        let produtos = JSON.parse(localStorage.getItem('Base_Produtos'));
        produtos = produtos.filter(x => x.id !== id);
        localStorage.setItem('Base_Produtos', JSON.stringify(produtos));
        atualizarTabelaProdutosAdmin();
    }
}

function atualizarTabelaClientesAdmin() {
    const corpo = document.getElementById('tabela-clientes-corpo');
    if (!corpo) return;
    const clientes = JSON.parse(localStorage.getItem('Base_Clientes')) || [];
    corpo.innerHTML = "";
    clientes.forEach(c => {
        corpo.innerHTML += `<tr><td>${c.id}</td><td>${c.nome}</td><td>${c.email}</td><td><button onclick="prepararEdicaoCliente(${c.id}, '${c.nome}', '${c.email}')" class="btn-acao btn-salvar">Alterar</button> <button onclick="excluirClienteBD(${c.id})" class="btn-acao btn-cancelar">Excluir</button></td></tr>`;
    });
}

function gravarClienteCRUD() {
    const id = document.getElementById('crud-id-cliente').value;
    let clientes = JSON.parse(localStorage.getItem('Base_Clientes')) || [];
    if (id) {
        let c = clientes.find(x => x.id === parseInt(id));
        if (c) { c.nome = document.getElementById('crud-nome-cliente').value; c.email = document.getElementById('crud-email-cliente').value; }
    } else {
        clientes.push({ id: Date.now(), nome: document.getElementById('crud-nome-cliente').value, email: document.getElementById('crud-email-cliente').value });
    }
    localStorage.setItem('Base_Clientes', JSON.stringify(clientes));
    limparFormCliente();
    atualizarTabelaClientesAdmin();
}

function atualizarTabelaEntregadoresAdmin() {
    const corpo = document.getElementById('tabela-entregadores-corpo');
    if (!corpo) return;
    const entregadores = JSON.parse(localStorage.getItem('Base_Entregadores')) || [];
    corpo.innerHTML = "";
    entregadores.forEach(e => {
        corpo.innerHTML += `<tr><td>${e.id}</td><td>${e.nome}</td><td>${e.veiculo}</td><td><button onclick="prepararEdicaoEntregador(${e.id}, '${e.nome}', '${e.veiculo}')" class="btn-acao btn-salvar">Alterar</button> <button onclick="excluirEntregadorBD(${e.id})" class="btn-acao btn-cancelar">Excluir</button></td></tr>`;
    });
}

function gravarEntregadorCRUD() {
    const id = document.getElementById('crud-id-entregador').value;
    let entregadores = JSON.parse(localStorage.getItem('Base_Entregadores')) || [];
    if (id) {
        let e = entregadores.find(x => x.id === parseInt(id));
        if (e) { e.nome = document.getElementById('crud-nome-entregador').value; e.veiculo = document.getElementById('crud-veiculo-entregador').value; }
    } else {
        entregadores.push({ id: Date.now(), nome: document.getElementById('crud-nome-entregador').value, veiculo: document.getElementById('crud-veiculo-entregador').value });
    }
    localStorage.setItem('Base_Entregadores', JSON.stringify(entregadores));
    limparFormEntregador();
    atualizarTabelaEntregadoresAdmin();
}

function excluirEntregadorBD(id) {
    let entregadores = JSON.parse(localStorage.getItem('Base_Entregadores'));
    entregadores = entregadores.filter(x => x.id !== id);
    localStorage.setItem('Base_Entregadores', JSON.stringify(entregadores));
    atualizarTabelaEntregadoresAdmin();
}

function excluirClienteBD(id) {
let clientes = JSON.parse(localStorage.getItem('Base_Clientes'));
clientes = clientes.filter(x => x.id !== id);
localStorage.setItem('Base_Clientes', JSON.stringify(clientes));
atualizarTabelaClientesAdmin();
}

