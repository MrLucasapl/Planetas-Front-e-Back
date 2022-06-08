'use strict'

function verificarMenuOpicaoUm() {

    const filtro1 = document.getElementsByClassName('menu')[0].value;

    if (filtro1 > 0) {
        document.querySelectorAll('.efeito-label')[0].style.marginTop = "-6px";
        document.querySelectorAll('.efeito-label')[0].style.background = "linear-gradient(rgba(18, 20, 25, 0.301), #2A2A2A)";
    } else {
        document.querySelectorAll('.efeito-label')[0].style.marginTop = "14px";
        document.querySelectorAll('.efeito-label')[0].style.background = "none";
    }

}
function verificarMenuOpicaoDois() {

    const filtro2 = document.getElementsByClassName('menu')[1].value;

    if (filtro2 > 0) {
        document.querySelectorAll('.efeito-label')[1].style.marginTop = "-6px";
        document.querySelectorAll('.efeito-label')[1].style.background = "linear-gradient(rgba(18, 20, 25, 0.301), #2A2A2A)";
    } else {
        document.querySelectorAll('.efeito-label')[1].style.marginTop = "14px";
        document.querySelectorAll('.efeito-label')[1].style.background = "none";
    }

}

function sliderCardes() {

    const slider = document.getElementById("grupo-cardes");
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