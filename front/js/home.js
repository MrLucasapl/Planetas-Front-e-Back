'use strict'

function diretorio() {

    var menu = document.getElementsByClassName("caixa-menu")[0];
    menu.addEventListener("click", () => {

        let opcoesMenu = document.getElementsByClassName("caixa-menu")[0];

        let li = document.getElementsByTagName('li')[0];
        li.style.borderBottom = '1px solid #2A2A2A';

        opcoesMenu.classList.toggle("active");

        if (opcoesMenu.classList.contains("active")) {
            document.getElementById("menu").style.visibility = "visible";

        }
        else {
            document.getElementById("menu").style.visibility = "hidden";
        }
    });

}
