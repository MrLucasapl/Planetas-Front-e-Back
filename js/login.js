const loginUsuarios = require('../usuarios.json');

const procuraUsuario = (reqLogin, reqsenha) => {

    if (reqLogin != "" || reqsenha != "") {

        let usuarioLocalizado = loginUsuarios.data?.filter(login => login.usuario.includes(reqLogin));

        if (usuarioLocalizado.length > 0 && usuarioLocalizado !== "") {

            return { usuarioLocalizado };

        } else {

            return false;
        }

    } else {

        return false;

    }

}

const validaUsuario = (status, reqLogin, reqsenha) => {

    if ((status.usuarioLocalizado[0].usuario == reqLogin) && (status.usuarioLocalizado[0].senha == reqsenha)) {

        return true;

    } else {

        return false;

    }
}

module.exports = {
    procuraUsuario,
    validaUsuario
}