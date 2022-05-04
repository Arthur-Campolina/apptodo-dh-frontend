let campoEmailLogin = document.getElementById("inputEmail");
let campoSenhaLogin = document.getElementById("inputPassword");
let botaoAcessar = document.getElementById("botaoAcessar");

let campoEmailLoginNormalizado;
let campoSenhaLoginNormalizado;

let emailEValido = false;

const usuarioObjeto = {
  email: "",
  password: "",
};

botaoAcessar.addEventListener("click", (event) => {
  if (validacaoTelaDeLogin()) {
    event.preventDefault();
    // se os campos nnão forem vazios, faça isso

    // Tirando os espaços em brancos dos valores
    campoEmailLoginNormalizado = retiraEspacosDeUmValor(campoEmailLogin.value);
    campoSenhaLoginNormalizado = retiraEspacosDeUmValor(campoSenhaLogin.value);
    campoEmailLoginNormalizado = conventerValorRecebidoParaMinusculo(
      campoEmailLoginNormalizado
    );
    // campoSenhaLogin = conventerValorRecebidoParaMinusculo(
    //   campoSenhaLoginNormalizado @@ Quando retirei esse campo de validação, começou a parar o erro no .trim()
    // );

    //Populando o objeto com as informações normalizadas

    usuarioObjeto.email = campoEmailLoginNormalizado;
    usuarioObjeto.password = campoSenhaLoginNormalizado;

    // @@ Incluindo acesso a API com o Login
    let loginUsuarioJson = JSON.stringify(usuarioObjeto);

    let endPointLogin = "https://apptodo-dh-backend.herokuapp.com/oauth/token";

    let configRequisicao = {
      method: "POST",
      body: loginUsuarioJson,
      headers: {
        "content-type": "application/json",
      },
    };
    fetch(endPointLogin, configRequisicao)
      .then((result) => {
        if (result.status == 201) {
          return result.json();
        }
      })
      .then((result) => {
        loginSucesso(result.jwt);
      })
      .catch((erro) => {
        loginErro(erro);
      });
  } else {
    Swal.fire({
      // se não, alerte.

      icon: "info",
      title: "Ambos os campos devem ser informados!",
    });
    event.preventDefault(); //Não permite que o formulário seja executado / realizado o 'submit'
  }
});

function loginSucesso(tokenJwt) {
  localStorage.setItem("jwt", tokenJwt); // Salvando o token no localStorage para consulta no script de tarefas.

  mostrarSpinner();

  setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "Usuário logado com sucesso !",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 1000);

  setTimeout(() => {
    location.href = "tarefas.html";
  }, 2000);

  // Direcionando para a página quando o user for valido
}

// @@ Função invocada quando há um erro de requisição na API

function loginErro(erro) {
  let error = document.getElementById("inputSenhaValidacao");
  let inputEmailValidacao = document.getElementById("inputEmail");
  let inputError = document.getElementById("inputPassword");

  error.style.color = "red";
  error.style.fontSize = "11px";
  error.style.fontWeight = "bold";
  error.style.marginTop = "10px";

  inputError.style.border = `1px solid red`;
  inputEmailValidacao.style.border = `1px solid red`;
  Swal.fire({
    icon: "error",
    title: 'Senha e/ou E-mail inválidos!"',
    text: "Tente novamente!",
  });
}

// @@ Validação quando sair do campo do input (blur)
campoEmailLogin.addEventListener("change", () => {
  let inputEmailValidacao = document.getElementById("inputEmailValidacao");

  if (
    campoEmailLogin.value != "" &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(campoEmailLogin.value) // Validação do e-mail
  ) {
    inputEmailValidacao.innerText = "";
    campoEmailLogin.style.border = "1px solid green";

    emailEValido = true;
  } else {
    //Se o campo estiver sem nenhum valor...
    inputEmailValidacao.innerText = "E-mail inválido";
    inputEmailValidacao.style.color = "red";
    inputEmailValidacao.style.fontWeight = "bold";

    campoEmailLogin.style.border = "1px solid red";

    emailEValido = false;
  }

  validacaoTelaDeLogin();
});

campoSenhaLogin.addEventListener("change", () => {
  // O change valida em tempo real
  let inputSenhaValidacao = document.getElementById("inputSenhaValidacao");

  if (campoSenhaLogin.value != "") {
    inputSenhaValidacao.innerText = "";
    campoSenhaLogin.style.border = "1px solid green";
    emailEValido = true;
  } else {
    inputSenhaValidacao.innerText = "Senha inválida";
    inputSenhaValidacao.style.color = "red";
    inputSenhaValidacao.style.fontSize = "8px";
    inputSenhaValidacao.style.fontWeight = "bold";

    campoSenhaLogin.style.border = "1px solid red";

    emailEValido = false;
  }
});

function validacaoTelaDeLogin() {
  if (emailEValido) {
    botaoAcessar.removeAttribute("disabled");
    botaoAcessar.innerText = "Acessar";
    return true; // A função retorna true, pois ela pode ser utilizada como uma condicional
  } else {
    botaoAcessar.setAttribute("disabled", true);
    botaoAcessar.innerText = "Bloqueado";
    return false; // A função retorna false, pois ela pode ser utilizada como uma condicional
  }
}
