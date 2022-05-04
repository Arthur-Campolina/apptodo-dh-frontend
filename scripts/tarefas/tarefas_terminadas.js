let ulTarefaTerminada = document.querySelector(".tarefas-terminadas");

function renderizaTarefasTerminadas(tarefa) {
  let liTarefaFinalizada = document.createElement("li");
  liTarefaFinalizada.classList.add("tarefa");
  liTarefaFinalizada.setAttribute("data-aos", "fade-right");
  liTarefaFinalizada.setAttribute("data-aos-duration", "1000");

  liTarefaFinalizada.innerHTML = `
    <div class="done"></div>
    <div class="descricao">
    <p class="nome">${tarefa.description}</p>
    <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dayjs(
      tarefa.createdAt
    ).format("DD/MM/YYYY - HH:mm:ss A - dddd")}</p>
    <div>
        <button onclick = "returnTask(${
          tarefa.id
        })"><i class="fas fa-undo-alt change"></i></button>
        <button onclick = "deleteTask(${
          tarefa.id
        })"><i class="far fa-trash-alt"></i></button>
    </div>
    </div>
  
          `;

  ulTarefaTerminada.appendChild(liTarefaFinalizada);
}

function getId(id) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointUpdateTask = `https://apptodo-dh-backend.herokuapp.com/tasks/${id}/status`;

  let bodyUpdateTask = {
    completed: true,
    createdAt: dayjs(),
  };

  let updateTaskJson = JSON.stringify(bodyUpdateTask); // Foi convertida para JSON para conseguirmos enviar para o servidor

  let configUpdateTasks = {
    method: "PUT",
    body: updateTaskJson,
    headers: {
      "content-type": "application/json",
      authorization: tokenJwt,
    },
  };

  fetch(endPointUpdateTask, configUpdateTasks)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      
      Swal.fire({
        icon: "success",
        title: "Tarefa concluída com sucesso !",
        showConfirmButton: false,
        timer: 1300,
      });
      setTimeout(() => {
        window.location.reload();
      }, 1400);
    })
    .catch((e) => {
      console.log(e);
    });
}
