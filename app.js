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

app.delete("/planeta/:index", (req, res) => {

    console.log(req.params.index)
    const reqPlaneta = req.params.index;
    planetas.splice(reqPlaneta, 1);
    escreverJson(planetas);

    res.sendStatus(200)
});

app.post("/html/descricaoPlaneta.html", (req, res) => {

    const { index, name, area, description, sunDistance, durationDay, gravity } = req.body

    planetas[index] = {
        ...planetas[index],
        name,
        area,
        description,
        sunDistance,
        durationDay,
        gravity
    }

    escreverJson(planetas)

});

app.post("/addPlanetas", upload.single("image"), async (req, res) => {

    const reposta = req.body;
    const urlImg = "/img/" + req.file.originalname;

    const novoPlaneta = {
        name: reposta.nome,
        image: urlImg,
        description: reposta.descricao,
        area: parseFloat(reposta.area),
        durationDay: parseFloat(reposta.duracao),
        sunDistance: parseFloat(reposta.distancia),
        gravity: parseFloat(reposta.gravidade)
    }

    planetas.push(novoPlaneta);
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