onload = () => {
  AOS.init();

  renderizarSkeletons(5, ".tarefas-pendentes");
  let nomeUsuario = document.querySelector(".user-info p");
  let endPointLogin = "https://ctd-todo-api.herokuapp.com/v1/users/getMe";

  let tokenJwt = localStorage.getItem("jwt");
  console.log(tokenJwt);
  let configRequisicao = {
    method: "GET",
    headers: {
      authorization: tokenJwt,
    },
  };

  const imgData = localStorage.getItem("imgData");
  document.querySelector("#userImg").setAttribute("src", imgData);

  // @@ Criando a requisição para pegar as informações do usuário

  fetch(endPointLogin, configRequisicao)
    .then((result) => {
      if (result.status == 200) {
        return result.json();
      }
    })
    .then((result) => {
      nomeUsuario.innerText = `Olá, ${result.firstName}`;
    })
    .catch((erro) => {
      console.log(erro);
    });

  let endPointTask = "https://apptodo-dh-backend.herokuapp.com/tasks";

  // @@ Criando a requisição para pegar as informações das tarefas

  fetch(endPointTask, configRequisicao)
    .then((result) => {
      if (result.status == 200) {
        return result.json();
      }
    })
    .then((result) => {
      setTimeout(() => {
        manipularTarefas(result);
        removerSkeleton(".tarefas-pendentes");
      }, 1000);
    })
    .catch((erro) => {
      console.log(erro);
    });

  // @@ Criando a requisição para criar uma tarefa e mostrar no console.

  let formTarefa = document.querySelector(".nova-tarefa button");

  formTarefa.addEventListener("click", (e) => {
    e.preventDefault();

    const inputTarefa = document.getElementById("novaTarea").value;
    if (inputTarefa == "" || inputTarefa == " ") {
      Swal.fire({
        icon: "error",
        title: "Campo vazio !",
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      let bodyNewTask = {
        description: inputTarefa,
        completed: false,
      };

      let newTaskJson = JSON.stringify(bodyNewTask); // Foi convertida para JSON para conseguirmos enviar para o servidor

      let configNewTasks = {
        method: "POST",
        body: newTaskJson,
        headers: {
          "content-type": "application/json",
          authorization: tokenJwt,
        },
      };

      fetch(endPointTask, configNewTasks)
        .then((result) => {
          return result.json();
        })
        .then((result) => {
          console.log(result);

          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });

  function manipularTarefas(listar) {
    for (let task of listar) {
      if (task.completed) {
        // Tarefas terminadas
        renderizaTarefasTerminadas(task);
      } else {
        // Tarefas pendentes
        renderizaTarefasPendentes(task);
      }
    }
  }
};
