const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const validacao = require('./js/login');
const dados = require('./planetas.json');
const multer = require('multer');
const filesystem = require('fs');

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/front/img");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'front')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let planetas = [];

filesystem.readFile("planetas.json", "utf-8", (erro, data) => {
    if (erro) {
        console.log(erro)
    } else {
        planetas = JSON.parse(data);
    }
});

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/front/index.html");
});

app.get("/html/login", (req, res) => {
    return res.sendFile(__dirname + "/front/html/login.html");
});

app.post("/html/login", (req, res) => {

    const reqLogin = req.body.login;
    const reqSenha = req.body.senha;

    let status = validacao.procuraUsuario(reqLogin, reqSenha);

    if (status != false) {
        status = validacao.validaUsuario(status, reqLogin, reqSenha);

        (status == true) ? res.status(200).send({ mensagem: "/html/home.html" }) : res.status(404).send({ mensagem: "Login ou senha incorretas" });

    } else {

        return res.status(404).send({ mensagem: "cadastro não encontrado" });

    }

});

app.get("/html/planetas", (req, res) => {

    const jsonDados = JSON.stringify(dados);
    res.end(jsonDados);

});

app.get("/planetas.html", (req, res) => {
    return res.sendFile(__dirname + "/front/html/planetas.html");
});

app.get("/home.html", (req, res) => {
    return res.sendFile(__dirname + "/front/html/home.html");
});

app.delete("/planeta", (req, res) => {

    const reqPlaneta = req.query.name;
    const deletar = dados.findIndex((planeta) => planeta.name === reqPlaneta);
    console.log(deletar);
    dados.splice(deletar, 1);

    res.sendStatus(200)
});

app.post("/descricaoplaneta", (req, res) => {

    /* const reqPlaneta = req.body; */
    const reqPlaneta = req.query.inputnome;
    console.log(reqPlaneta);

    /*  const atualizar = dados.data.findIndex((planeta) => planeta.name === reqPlaneta);
     res.sendFile("http://localhost:4002/descricaoPlaneta.html?id=" + atualizar) */

});

app.post("/addPlanetas", upload.single("image"), async (req, res) => {
    console.log("aqui")

    const reposta = req.body;
    const urlImg = "/img/" + req.file.originalname;

    const novoPlaneta = {
        name: reposta.nome,
        image: urlImg,
        description: reposta.descricao,
        area: reposta.area,
        durationday: reposta.duracao,
        sundistance: reposta.distancia,
        gravity: reposta.gravidade
    }

    planetas.push(novoPlaneta);
    console.log(planetas)
    escreverJson(planetas)
    res.sendFile(__dirname + "/front/html/addPlanetas.html");

})

function escreverJson(planetas) {

    filesystem.writeFile("planetas.json", JSON.stringify(planetas), (erro) => {
        if (erro) {
            console.log(erro)
        } else {
            console.log("cadastrado com sucesso!")
        }
    });

}

app.listen(4002, () => console.log("server rodando na porta 4002"))