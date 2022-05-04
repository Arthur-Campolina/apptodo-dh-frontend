function deleteTask(event) {
  let tokenJwt = localStorage.getItem("jwt");

  let endPointDeleteTask = `https://apptodo-dh-backend.herokuapp.com/tasks/${event}`;

  let configDeleteTasks = {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: tokenJwt,
    },
  };

  Swal.fire({
    icon: "question",
    title: "Você tem certeza que quer excluir a tarefa?",
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: 'Não',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Tarefa excluida!",
        showConfirmButton: false,
        timer: 1000,
      });
      fetch(endPointDeleteTask, configDeleteTasks)
        .then((result) => {
          return result.json();
        })
        .catch((e) => {
          alert(e);
        });
      setTimeout(() => {
        // tokenJwt = localStorage.removeItem("jwt")
        window.location.reload();
      }, 1100);
    } else if (result.isDenied) {
      Swal.fire({
        icon: "info",
        title: "Tarefa mantida!",
        showConfirmButton: false,
        timer: 1000,
      });
      // location.reload()
    }
  });
}
