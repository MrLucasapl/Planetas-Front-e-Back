'use strict'

function pegarParametro() {

    var url = window.location.search;
    var urlParametro = new URLSearchParams(url);
    var index = urlParametro.get('id');

    mostraDados(index);
    trocarDados(index);
    editarPlaneta(index);

}

function trocarDados(id) {

    let novoIndex = id;
    novoIndex = parseInt(novoIndex);

    let setaEsquerda = document.querySelectorAll('.seta')[0];
    setaEsquerda.setAttribute('onclick', `percorreEsquerda(${novoIndex})`);

    let setaDireita = document.querySelectorAll('.seta')[1];
    setaDireita.setAttribute('onclick', `percorreDireita(${novoIndex})`);

    let botaoSalvar = document.getElementById('form-botao-salvar');
    botaoSalvar.setAttribute('onclick', `salvarEdicao(${novoIndex})`);

}

function percorreEsquerda(novoIndex) {

    let novoID = novoIndex - 1;

    if (novoID < 0) {
        novoID = originalData.length - 1;
        mostraDados(novoID);
    }

    mostraDados(novoID);
    trocarDados(novoID);

}

function percorreDireita(novoIndex) {

    let novoID = novoIndex + 1;

    if (novoID > (originalData.length - 1)) {
        novoID = 0;
        mostraDados(novoID);
    }

    mostraDados(novoID);
    trocarDados(novoID);

}


function mostraDados(index) {

    let nome = document.getElementById('nome');
    nome.innerHTML = originalData[index].name;

    let descricao = document.getElementById('descricao');
    descricao.innerHTML = originalData[index].description;

    let imgplaneta = document.getElementById('imgplaneta');
    imgplaneta.src = originalData[index].image;

    let area = document.getElementById('area');
    area.innerHTML = originalData[index].area;

    let distacia = document.getElementById('distacia');
    distacia.innerHTML = originalData[index].sunDistance;

    let time = {

        dia: Math.floor(originalData[index].durationDay / 86400000),
        hora: Math.floor(originalData[index].durationDay / 3600000) % 24,
        minutos: Math.floor(originalData[index].durationDay / 60000) % 60,
        segundo: Math.floor(originalData[index].durationDay / 1000) % 60,
        milisegundos: Math.floor(originalData[index].durationDay) % 1000

    };

    let respostaDuracao = time.dia + "d " + time.hora + "h " + time.minutos + "m ";
    let duracao = document.getElementById('duracao');
    duracao.innerHTML = respostaDuracao;

    let gravidade = document.getElementById('gravidade');
    gravidade.innerHTML = originalData[index].gravity;

}

function editarPlaneta(idEditar) {

    let inputs = document.querySelectorAll('input');

    inputs.forEach(input => {

        if (input.value != "") {

            switch (input.id) {

                case "input-nome":
                    originalData[idEditar].name = document.getElementById('input-nome').value;
                    break;

                case "input-area":
                    originalData[idEditar].area = document.getElementById('input-area').value;
                    break;

                case "input-descricao":
                    originalData[idEditar].description = document.getElementById('input-descricao').value;
                    break;

                case "input-distancia":
                    originalData[idEditar].sunDistance = document.getElementById('input-distancia').value;
                    break;

                case "input-duracao":
                    originalData[idEditar].durationDay = document.getElementById('input-duracao').value;
                    break;

                case "input-gravidade":
                    originalData[idEditar].gravity = document.getElementById('input-gravidade').value;
                    break;
            }

        }

    });

    mostraDados(idEditar);

}

function salvarEdicao(idEditar) {

    editarPlaneta(idEditar)

}

function cancelarEdicao() {

    let inputs = document.querySelectorAll('input');

    inputs.forEach(element => {

        element.value = "";

    });

}

function sliderCardes() {

    const slider = document.querySelectorAll(".container-caixas")[0];
    console.log(slider)
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 3;
        slider.scrollLeft = scrollLeft - walk;
        console.log(walk);
    });

}