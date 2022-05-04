let inputNome = document.getElementById("inputNome");
let inputApelido = document.getElementById("inputApelido");
let inputEmail = document.getElementById("inputEmail");
let inputSenha = document.getElementById("inputSenha");
let inputRepetirSenha = document.getElementById("inputRepetirSenha");
let botaoCriarConta = document.getElementById("btnCriarConta");

//--capturando a imagem--//
document.querySelector("#userImage").addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("imgData", reader.result);
  });

  reader.readAsDataURL(this.files[0]);
});

let campoNomeNormalizado;
let campoApelidoNormalizado;
let campoEmailNormalizado;
let campoSenhaNormalizado;
let campoRepetirSenhaNormalizado;

let novoUsuario = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  // imageUser: "",
};

let emailValido = false;
let senhaValida = false;
let nomeValido = false;
let repetirSenha = false;
let imageUser = false;

// Validação para verificar se os campos estão preenchidos e se estiverem para normalizar, deixar sem espaços e tudo minusculo, exceto o apelido.

botaoCriarConta.addEventListener("click", (e) => {
  e.preventDefault(); // está aqui para fins de teste (visualizar no console do navegador)

  if (validacaoTelaDeLogin()) {
    // Normalizando os inputs'
    campoNomeNormalizado = retiraEspacosDeUmValor(inputNome.value);
    campoNomeNormalizado = conventerValorRecebidoParaMinusculo(inputNome.value);
    campoApelidoNormalizado = retiraEspacosDeUmValor(inputApelido.value);
    campoEmailNormalizado = retiraEspacosDeUmValor(inputEmail.value);
    campoEmailNormalizado = conventerValorRecebidoParaMinusculo(
      campoEmailNormalizado
    );
    // campoSenhaNormalizado = conventerValorRecebidoParaMinusculo(
    //   inputSenha.value // @@ Foi retirado, para que as senhas pudessem ter caracteres maiúsculas.
    // );
    campoRepetirSenhaNormalizado = conventerValorRecebidoParaMinusculo(
      inputRepetirSenha.value
    );

    novoUsuario.firstName = campoNomeNormalizado;
    novoUsuario.lastName = campoApelidoNormalizado;
    novoUsuario.email = campoEmailNormalizado;
    novoUsuario.password = inputSenha.value; // Não foi normalizada para que a senha pudesse ser maiúscula
    novoUsuario.repetirSenha = campoRepetirSenhaNormalizado;

    // @ Criando um novo usuário pela API
    let cadastroJson = JSON.stringify(novoUsuario);
    let endPointLogin = "https://apptodo-dh-backend.herokuapp.com/users";

    let configNewUser = {
      method: "POST",
      body: cadastroJson,
      headers: {
        "content-type": "application/json",
      },
    };

    fetch(endPointLogin, configNewUser)
      .then((result) => {
        if (result.status == 201) {
          return result.json();
        }
      })
      .then((result) => {
        mostrarSpinner();
        cadastroSucesso();
      })
      .catch((erro) => {
        console.log(erro);
        ocultarSpinner();
      });
  } else {
    Swal.fire({
      icon: "warning",
      title: "Todos os campos devem ser preenchidos !",
      showConfirmButton: false,
      timer: 2000,
    });
    setTimeout(() => {
      location.href = "signup.html";
    }, 2100);
  }
});

function cadastroSucesso() {
  setTimeout(() => {
    Swal.fire({
      icon: "success",
      title: "Cadastro efetuado com sucesso !",
      showConfirmButton: false,
      timer: 1500,
    });
  }, 1000);

  setTimeout(() => {
    location.href = "index.html";
  }, 2500);
}

// Validação do campo de nome

inputNome.addEventListener("blur", () => {
  let smallNome = document.getElementById("smallNome");

  if (inputNome.value != "") {
    smallNome.innerText = "";
    inputNome.style.border = "1px solid #45dd45a1";

    nomeValido = true;
  } else {
    smallNome.innerText = "Nome é obrigatório !";
    smallNome.style.color = "red";
    smallNome.style.fontWeight = "bold";
    smallNome.style.marginTop = "5px";
    smallNome.style.fontSize = "11px";
    inputNome.style.border = "1px solid red";

    nomeValido = false;
  }
  validacaoTelaDeLogin();
});

// Validação do campo de e-mail

inputEmail.addEventListener("blur", () => {
  let smallEmail = document.getElementById("smallEmail");

  if (
    inputEmail.value != "" &&
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputEmail.value)
  ) {
    smallEmail.innerText = "";
    inputEmail.style.border = "1px solid #45dd45a1";

    emailValido = true;
  } else {
    smallEmail.innerText = "E-mail inválido";
    smallEmail.style.color = "red";
    smallEmail.style.fontSize = "11px";
    smallEmail.style.fontWeight = "bold";
    smallEmail.style.marginTop = "5px";

    inputEmail.style.border = "1px solid red";

    emailValido = false;
  }
  validacaoTelaDeLogin();
});

// Validação do tamanho da senha

inputSenha.addEventListener("keyup", () => {
  let smallSenha = document.getElementById("smallSenha");

  if (
    inputSenha.value != "" &&
    inputSenha.value.length >= 1 &&
    inputSenha.value.length <= 4
  ) {
    inputSenha.style.border = "1px solid red";
    smallSenha.style.fontWeight = "bold";
    smallSenha.innerText = "Senha muito fraca 😥";
    smallSenha.style.color = "red";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";
  } else if (
    inputSenha.value != "" &&
    inputSenha.value.length >= 5 &&
    inputSenha.value.length <= 7
  ) {
    inputSenha.style.border = "1px solid orange";
    smallSenha.style.fontWeight = "bold";
    smallSenha.style.color = "orange";
    smallSenha.innerText = "Estamos quase lá 😀";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";
    senhaValida = true;
  } else if (inputSenha.value != "" && inputSenha.value.length >= 8) {
    inputSenha.style.border = "1px solid #45dd45a1";
    smallSenha.style.fontWeight = "bold";
    smallSenha.style.color = "#45dd45";
    smallSenha.innerText = "Senha forte 💪";
    smallSenha.style.marginTop = "10px";
    smallSenha.style.fontSize = "11px";

    senhaValida = true;
  } else {
    smallSenha.innerText = "";
    senhaValida = false;
  }

  //  Validação Imagem do Usuário

  function validarArquivo() {
    var arquivoInput = document.getElementById("arquivo");
    var caminhoArquivo = arquivoInput.value;
    var extensoesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;

    if (!extensoesPermitidas.exec(caminhoArquivo)) {
      alert(
        "Por favor envie um arquivo que tenha as extensões.jpeg/.jpg/.png/.gif ."
      );
      arquivoInput.value = "";
      return false;
    } else {
      if (arquivoInput.files && arquivoInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          document.getElementById("visualizarImagem").innerHTML = "";
        };
        reader.readAsDataURL(arquivoInput.files[0]);
        console.log(arquivoInput.files[0].size / 1024 / 1024);
        console.log(arquivoInput.files[0].size);
        if (arquivoInput.files[0].size > 2097152) {
          alert("Tamanho do arquivo deve ser 2 MB!");
          return false;
        }
      }
    }
  }
  validacaoTelaDeLogin();
});

inputRepetirSenha.addEventListener("keyup", () => {
  // Trocado para o keyup, para validar enquanto digita
  let smallRepetirSenha = document.getElementById("smallRepetirSenha");

  if (inputSenha.value === inputRepetirSenha.value) {
    smallRepetirSenha.innerText = "Senhas iguais";
    smallRepetirSenha.style.color = "#45dd45";

    inputRepetirSenha.style.border = "1px solid #45dd45a1";
    repetirSenha = true;
  } else {
    smallRepetirSenha.innerHTML = "Senha errada";
    smallRepetirSenha.style.fontWeight = "bold";
    smallRepetirSenha.style.marginTop = "5px";
    smallRepetirSenha.style.color = "red";
    smallRepetirSenha.style.fontSize = "11px";

    inputRepetirSenha.style.border = "1px solid red";
    repetirSenha = false;
  }
  validacaoTelaDeLogin();
});

function validacaoTelaDeLogin() {
  // Função criada para haiblitar o botão ou não.
  if (
    emailValido === true &&
    senhaValida === true &&
    nomeValido === true &&
    repetirSenha === true
  ) {
    // Se o e-mail for válido (true), ele habilita o botão e troca o texto para acessar

    botaoCriarConta.removeAttribute("disabled");
    botaoCriarConta.innerText = "Acessar";
    return true; // A função retorna true, pois ela pode ser utilizada como uma condicional
  } else {
    // Se o e-mail for falso (false), ele desabilita o botão e troca o texto para bloqueado.

    botaoCriarConta.setAttribute("disabled", true);
    botaoCriarConta.innerText = "Bloqueado";
    return false; // A função retorna false, pois ela pode ser utilizada como uma condicional
  }
}
