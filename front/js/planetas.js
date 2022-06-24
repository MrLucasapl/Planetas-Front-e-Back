
function listaDados(data) {
    limparTela();
    planetasCardes(data);
}

function filtrarCardes(planetas) {

    let input1 = document.querySelectorAll("#buscar")[0];
    let input2 = document.querySelectorAll(".menu")[0];
    let input3 = document.querySelectorAll(".menu")[1];

    if ((input1.value == "") && (input2.value == 0) && (input3.value == 0)) {

        limparTela();
        planetasCardes(planetas);
        tabelaCorporativa(planetas);

    } else if ((input1.value == "") && (input2 != 0) && (input3 != 0)) {

        switch (input2.value) {

            case "1":
                if (input3.value == "1") {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.area > b.area ? -1 : a.area < b.area ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                } else {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.area < b.area ? -1 : a.area > b.area ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                }
                break;

            case "2":
                if (input3.value == "1") {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.sunDistance > b.sunDistance ? -1 : a.sunDistance < b.sunDistance ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                } else {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.sunDistance < b.sunDistance ? -1 : a.sunDistance > b.sunDistance ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                }
                break;

            case "3":
                if (input3.value == "1") {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.durationDay > b.durationDay ? -1 : a.durationDay < b.durationDay ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                } else {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.durationDay < b.durationDay ? -1 : a.durationDay > b.durationDay ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                }
                break;

            case "4":
                if (input3.value == "1") {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.gravity > b.gravity ? -1 : a.gravity < b.gravity ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                } else {
                    limparTela();
                    let valor = planetas.sort(function (a, b) { return a.gravity < b.gravity ? -1 : a.gravity > b.gravity ? 1 : 0; });
                    planetasCardes(valor);
                    tabelaCorporativa(valor);
                }
                break;
        }

    } else {
        limparTela();
        let planetasFiltrados = planetas?.filter((planeta) => planeta.name.toLowerCase().includes(input1.value));
        planetasCardes(planetasFiltrados);
        tabelaCorporativa(planetasFiltrados);
    }

}

function planetasCardes(planetas) {
    limparTela();

    planetas.forEach((planeta, index) => {

        let grupoCardes = document.getElementById("grupo-cardes");

        let divCardes = document.createElement('div');
        divCardes.setAttribute('class', 'cardes');
        divCardes.setAttribute('id', `${index}`);

        let divImagemPlanetas = document.createElement('img');
        divImagemPlanetas.setAttribute('class', 'imagem-planeta');
        divImagemPlanetas.setAttribute('onclick', `identificaDados(${index})`);
        divImagemPlanetas.src = planeta.image;

        let divNomeCardes = document.createElement('div');
        divNomeCardes.setAttribute('class', 'nome-cardes');

        let pNomePlaneta = document.createElement('p');
        pNomePlaneta.setAttribute('class', 'nome-planeta');
        pNomePlaneta.innerHTML = planeta.name;

        let divCaixaDeletaInfo = document.createElement('div');
        divCaixaDeletaInfo.setAttribute('class', 'caixa-deleta-info');

        let imgLixo = document.createElement('img');
        imgLixo.setAttribute('class', 'imgLixo');
        imgLixo.setAttribute('name', `${index}`);
        imgLixo.setAttribute('onclick', `modal(${index})`);
        imgLixo.src = '../img/lataLixo.png';

        let imgInfo = document.createElement('img');
        imgInfo.setAttribute('class', 'imgInfo');
        imgInfo.setAttribute('name', `${index}`);
        imgInfo.setAttribute('onclick', `identificaDados(${index})`);
        imgInfo.src = '../img/setaDireita.png';

        grupoCardes.appendChild(divCardes);
        divCardes.appendChild(divImagemPlanetas);
        divCardes.appendChild(divNomeCardes);
        divNomeCardes.appendChild(pNomePlaneta);
        divNomeCardes.appendChild(divCaixaDeletaInfo);
        divCaixaDeletaInfo.append(imgLixo);
        divCaixaDeletaInfo.append(imgInfo);

    });
}

function tabelaCorporativa(planetas) {

    let tabela = document.createElement('table');
    tabela.setAttribute('class', 'tabela');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    let linhaTitulos = document.createElement('tr');

    let tituloPlaneta = document.createElement('th');
    tituloPlaneta.innerHTML = "Planeta";

    let tituloArea = document.createElement('th');
    tituloArea.innerHTML = "Área de superfície";

    let tituloDistancia = document.createElement('th');
    tituloDistancia.innerHTML = "Distância do sol";

    let tituloDuracao = document.createElement('th');
    tituloDuracao.innerHTML = "Duração do dia";

    let tituloGravidade = document.createElement('th');
    tituloGravidade.innerHTML = "Gravidade";

    linhaTitulos.appendChild(tituloPlaneta);
    linhaTitulos.appendChild(tituloArea);
    linhaTitulos.appendChild(tituloDistancia);
    linhaTitulos.appendChild(tituloDuracao);
    linhaTitulos.appendChild(tituloGravidade);

    thead.appendChild(linhaTitulos);

    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    let caixaTabela = document.getElementById('caixa-tabela');
    caixaTabela.appendChild(tabela);

    planetas?.forEach((planeta, index) => {

        let linhaDados = document.createElement('tr');
        let ColunaDados = document.createElement('td');

        ColunaDados.innerHTML = planeta.name;
        linhaDados.appendChild(ColunaDados);
        ColunaDados = document.createElement('td');

        let respostaArea = Number(planeta.area) * Number(0.000001);
        ColunaDados.innerHTML = respostaArea.toFixed(1) + " Km²";
        linhaDados.appendChild(ColunaDados);

        ColunaDados = document.createElement('td');

        let respostaDistacia = Number(planeta.sunDistance) / Number(1000);
        ColunaDados.innerHTML = respostaDistacia + " km²";
        linhaDados.appendChild(ColunaDados);

        ColunaDados = document.createElement('td');

        let time = {
            dia: Math.floor(planeta.durationDay / 86400000),
            hora: Math.floor(planeta.durationDay / 3600000) % 24,
            minutos: Math.floor(planeta.durationDay / 60000) % 60,
            segundo: Math.floor(planeta.durationDay / 1000) % 60,
            milisegundos: Math.floor(planeta.durationDay) % 1000

        };

        let respostaDuracao = time.dia + "d " + time.hora + "h " + time.minutos + "m ";
        ColunaDados.innerHTML = respostaDuracao;
        linhaDados.appendChild(ColunaDados);

        ColunaDados = document.createElement('td');

        let respostaGravidade = Number(planeta.gravity) / Number(3.6);
        ColunaDados.innerHTML = respostaGravidade.toFixed(2) + " m/s²";
        linhaDados.appendChild(ColunaDados);

        tbody.appendChild(linhaDados);

    });
}

function modal(index) {

    let fundoModal = document.getElementById("fundo-modal");

    let divModal = document.createElement('div');
    divModal.setAttribute('class', 'modal');

    let divImgFundo = document.createElement('div');
    divImgFundo.setAttribute('class', 'img-fundo');

    let imgModal = document.createElement('img');
    imgModal.setAttribute('alt', 'imagem do planeta');
    imgModal.setAttribute('class', 'img-modal');
    imgModal.src = '../img/planeta-modal (1).png';

    let divModalTxt = document.createElement('div');
    divModalTxt.setAttribute('class', 'modal-txt');

    let tagH3 = document.createElement('h3');
    tagH3.innerText = 'Tem certeza?';

    let tagP = document.createElement('p');
    tagP.innerHTML = 'Ao pressionar em <strong>deletar</strong> todos os dados desse planeta serão apagados dos sistema <strong>permanentemente!</strong> Deseja apagar todos os dados?'

    let divCaixaBotaoModal = document.createElement('div');
    divCaixaBotaoModal.setAttribute('class', 'caixa-botao-modal');

    let ButtonVoltar = document.createElement('div');
    ButtonVoltar.setAttribute('id', 'voltar');
    ButtonVoltar.setAttribute('type', 'button');
    ButtonVoltar.setAttribute('onclick', 'voltar()');
    ButtonVoltar.innerText = 'VOLTAR';

    let ButtonDeletar = document.createElement('div');
    ButtonDeletar.setAttribute('id', 'deletar');
    ButtonDeletar.setAttribute('name', `${index}`);
    ButtonDeletar.setAttribute('type', 'submit');
    ButtonDeletar.setAttribute('onclick', `deletaCard(${index})`);
    ButtonDeletar.innerText = 'DELETE';

    fundoModal.appendChild(divModal);
    divModal.appendChild(divImgFundo);
    divImgFundo.appendChild(imgModal);

    divModal.appendChild(divModalTxt);
    divModalTxt.appendChild(tagH3);
    divModalTxt.appendChild(tagP);

    divModal.appendChild(divCaixaBotaoModal);
    divCaixaBotaoModal.appendChild(ButtonVoltar);
    divCaixaBotaoModal.appendChild(ButtonDeletar);

    fundoModal.style.display = "block";

}

function deletaCard(index) {
    let namePlaneta = document.getElementsByClassName('nome-planeta')[index].innerHTML;

    let i = index++;
    delete originalData[i];
    let novaData = originalData;

    fetch(`http://localhost:4002/planeta?name=${namePlaneta}`, {
        method: 'DELETE',
    })
    .then(res => res.text())
    .then(res => console.log(res))

    let fundoModal = document.querySelector('#fundo-modal');
    fundoModal.style.display = "none";

    listaDados(novaData);
    planetasCardes(novaData);
    tabelaCorporativa(novaData);

}

function voltar() {

    let fundoModal = document.querySelector('#fundo-modal');
    fundoModal.style.display = "none";

}

function identificaDados(index) {

    window.location.href = "../html/descricaoPlaneta.html?id="+index;

    

}

function limparTela() {

    let cardes = document.querySelectorAll(".cardes");
    for (let index = 0; index < cardes.length; index++) {

        cardes[index].remove();

    }

    let tabela = document.querySelectorAll(".tabela");
    for (let index = 0; index < tabela.length; index++) {

        tabela[index].remove();

    }

}

