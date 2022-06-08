const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const validacao = require('./js/login');
const dados = require('./planetas.json');
const Fs = require('fs');

const app = express();

app.use(express.static(path.join(__dirname, 'front')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

        (status == true) ? res.sendFile(__dirname + "/front/html/home.html") : res.send("Login ou senha incorretas");

    } else {

        return res.status(404).send('cadastro não encontrado');

    }

});

app.get("/html/planetas", (req, res) => {

    const jsonDados = JSON.stringify(dados);
    res.end(jsonDados);

});

app.delete("/planeta", (req, res) => {

    const reqPlaneta = req.query.name;
    const deletar = dados.data.findIndex((planeta) => planeta.name === reqPlaneta);
    dados.data.splice(deletar, 1);

    res.sendStatus(200)
});

app.listen(4002, () => console.log("server rodando na porta 4002"))