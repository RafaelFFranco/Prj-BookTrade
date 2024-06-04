var dados;

$(document).ready(function () {
    let livrosSalvos = localStorage.getItem('livros');
    if (livrosSalvos) {
        dados = JSON.parse(livrosSalvos);
    } else {
        dados = [];
    }

    if (window.location.pathname.endsWith('editarLivro.html')) {
        editarLivro();
    }

    if (window.location.pathname.endsWith('detalhesLivro.html')) {
        let idDoLivroAtual = localStorage.getItem('livroAtual');
        if (idDoLivroAtual) {
            let livroAtual = dados.find(livro => livro.id == idDoLivroAtual);
            if (livroAtual) {
                $('#titulo').text(livroAtual.titulo);
                $('#Cidade').text(livroAtual.cidade);
                $('#Estado').text(livroAtual.estado);
                $('#Descrição').text(livroAtual.descricao);
                $('#Sinopse').text(livroAtual.sinopse);
                $('#Imagem-capa').attr('src', livroAtual.imagem);
            }
        }
    }

    if (window.location.pathname.endsWith('displayLivros.html')) {
        for (let livro of dados) {
            criarNovoElemento(livro);
        }
        removerCard();
    }
});

$('#imagem').change(function () {
    let ler = new FileReader();
    ler.onload = function (e) {
        $('#imagem').data('base64', e.target.result);
    }
    ler.readAsDataURL(this.files[0]);
});

function criarNovoElemento(livro) {
    let gridContainer = $('.grid-container');

    let novoCard = $('<div></div>').addClass('card').css('width', '12rem').data('id', livro.id);
    let cardBody = $('<div></div>').addClass('card-body');
    let imagem = $('<img>').addClass('card-img').attr('src', livro.imagem);
    let tituloLivro = $('<h5></h5>').addClass('card-title').text(livro.titulo);
    let detalhesLink = $('<a></a>').attr('href', 'detalhesLivro.html').addClass('btn btn-primary').text('Ver Detalhes');
    let deleteButton = $('<button></button>').addClass('deleteButton').text('Delete');
    let editButton = $('<button></button>').addClass('editButton').text('Editar');

    cardBody.append(imagem, tituloLivro, detalhesLink, deleteButton, editButton);
    novoCard.append(cardBody);
    gridContainer.append(novoCard);

    detalhesLink.click(function () {
        localStorage.setItem('livroAtual', livro.id);
    });
    editButton.click(function () {
        localStorage.setItem('livroAtual', livro.id);
        window.location.href = 'editarLivro.html';
    });
}

function removerCard() {
    $('.deleteButton').click(function () {
        let id = $(this).closest('.card').data('id');

        dados = dados.filter(livro => livro.id !== id);

        localStorage.setItem('livros', JSON.stringify(dados));

        $(this).closest('.card').remove();

        alert('Livro deletado da lista');
    });
}

function editarLivro() {
    let idDoLivroAtual = localStorage.getItem('livroAtual');
    if (idDoLivroAtual) {
        let livroAtual = dados.find(livro => livro.id == idDoLivroAtual);
        if (livroAtual) {
            $('#titulo-livro').val(livroAtual.titulo);
            $('#cidade').val(livroAtual.cidade);
            $('#estado').val(livroAtual.estado);
            $('#descricao').val(livroAtual.descricao);
            $('#sinopse').val(livroAtual.sinopse);
            $('#imagem').data('base64', livroAtual.imagem);
        }
    }
}

$('#btnAtualizar').click(function () {
    let idDoLivroAtual = localStorage.getItem('livroAtual');
    if (idDoLivroAtual) {
        let livroAtual = dados.find(livro => livro.id == idDoLivroAtual);
        if (livroAtual) {
            livroAtual.titulo = $('#titulo-livro').val();
            livroAtual.cidade = $('#cidade').val();
            livroAtual.estado = $('#estado').val();
            livroAtual.descricao = $('#descricao').val();
            livroAtual.sinopse = $('#sinopse').val();
            livroAtual.imagem = $('#imagem').data('base64') || livroAtual.imagem;

            localStorage.setItem('livros', JSON.stringify(dados));
            alert('Livro atualizado com sucesso!');
            window.location.href = 'displayLivros.html';
        }
    }
});

$('#btnCadastro').click(function () {
    let titulo = $('#titulo-livro').val();
    let cidade = $('#cidade').val();
    let estado = $('#estado').val();
    let descricao = $('#descricao').val();
    let sinopse = $('#sinopse').val();
    let imagem = $('#imagem').data('base64');

    let novoId = 1;
    if (dados.length != 0) {
        novoId = dados[dados.length - 1].id + 1;
    }

    let livro = {
        id: novoId,
        titulo: titulo,
        cidade: cidade,
        estado: estado,
        descricao: descricao,
        sinopse: sinopse,
        imagem: imagem,
    };

    dados.push(livro);
    localStorage.setItem('livros', JSON.stringify(dados));

    alert('Anúncio Salvo!');
    criarNovoElemento(livro);

    $('#titulo-livro').val('');
    $('#cidade').val('');
    $('#estado').val('');
    $('#descricao').val('');
    $('#sinopse').val('');
    $('#imagem').val('');

    window.location.href = 'displayLivros.html';
});
