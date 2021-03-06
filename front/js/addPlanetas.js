'use strict'

function enviarImg(event) {

    let arquivo = event.target.files[0];

    if (arquivo) {
        subirImagem(arquivo);
    }
}

function subirImagem(arquivo) {

    let arquivoImg = document.getElementById('addfoto');

    if (arquivo.type.startsWith("image/")) {
        const lerArquivo = new FileReader();

        lerArquivo.readAsDataURL(arquivo);
        lerArquivo.onload = () => {

            arquivoImg.style.backgroundImage = `url('${lerArquivo.result}')`;
            var imageFile = lerArquivo.result;
            document.getElementById('addfoto').value = imageFile;

        };
    } else {
        arquivoImg.style.backgroundImage = null;
        imageFile = null;
    }

}

function validaCampo() {

    let inputs = document.querySelectorAll('input');

    inputs.forEach(input => {

        if (input.value == "") {
            alert("Por Favor, Informe todos os campos!");
            return;
        }

    });

    salvarNovoPlaneta();

}

function botaoSalvar() {
    
    validaCampo();

}

function cancelarEdicao() {

    let inputs = document.querySelectorAll('input');

    inputs.forEach(element => {

        element.value = "";

    });

}

function sliderCardes() {

    const slider = document.querySelectorAll(".container-caixas")[0];

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