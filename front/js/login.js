document.forms['fomulario-login'].addEventListener('submit', (event) => {
    event.preventDefault();

    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target))
    })

        .then((res) => {
            return res.json();
        })

        .then((body) => {
            switch (body.mensagem) {

                case "Login ou senha incorretas":
                    alert('Login ou senha incorretas');
                    break;

                case "cadastro não encontrado":
                    alert('cadastro não encontrado');
                    break;

                case "/html/home.html":
                    window.location.href = "/html/home.html";
                    break;

                default:
                    console.log(`Desculpe`);

            }
        })

        .catch((error) => {
            console.log("erro catch " + error)
        })

})