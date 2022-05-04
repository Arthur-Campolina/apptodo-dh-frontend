let logOut = document.getElementById("closeApp");

let tokenJwt = localStorage.getItem("jwt");

logOut.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    icon: "question",
    title: "Você tem certeza que quer encerrar a sessão?",
    showDenyButton: true,
    confirmButtonText: "Sim",
    denyButtonText: 'Não',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Sessão encerrada !",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        tokenJwt = localStorage.removeItem("jwt");
        location.href = "index.html";
      }, 1100);
    } else if (result.isDenied) {
      Swal.fire({
        icon: "info",
        title: "Sessão mantida !",
        showConfirmButton: false,
        timer: 1000,
      });
      // location.reload()
    }
  });
});
