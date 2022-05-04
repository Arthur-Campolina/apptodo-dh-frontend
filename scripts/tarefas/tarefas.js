
    let tokenJwtusuarioLogado = localStorage.getItem("jwt")

    if(!tokenJwtusuarioLogado) {
        location.href = 'index.html'
    } else {
        console.log(tokenJwtusuarioLogado);

    }




// Se o token não existir, ele volta para a página inicial, se existir, mostra no console.