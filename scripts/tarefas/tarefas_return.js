function returnTask(event) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointUpdateTask = `https://apptodo-dh-backend.herokuapp.com/tasks/${event}`;

  let bodyUpdateTask = {
    completed: false,
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

  Swal.fire({
    icon: "question",
    title: "Você quer alterar a tarefa para em andamento ?",
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: 'Não',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Tarefa alterada para em andamento!",
        showConfirmButton: false,
        timer: 1000,
      });

      fetch(endPointUpdateTask, configUpdateTasks)
        .then((result) => {
          return result.json();
        })
        .catch((e) => {
          console.log(e);
        });

      setTimeout(() => {
        window.location.reload();
      }, 1100);
    } else if (result.isDenied) {
      Swal.fire({
        icon: "info",
        title: "Tarefa Mantida!",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });
}
