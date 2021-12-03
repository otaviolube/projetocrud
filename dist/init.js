"use strict";
const form = document.querySelector('.form');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const password2 = document.querySelector('.password2');
const button = document.querySelector('button');
button.disabled = true;
function habilitarBotaoSubmit(form) {
    let erros = form.querySelectorAll('.show-error-message');
    if (erros.length > 0) {
        button.disabled = true;
    }
    else {
        button.disabled = false;
    }
}
function verificarCamposVazios(...inputs) {
    inputs.forEach((campo) => {
        if (!campo.value) {
            console.log(`${campo.className} está vazio!`);
            apresentaMSGErro(campo, 'O campo não pode ser vazio!');
        }
    });
}
function excluirMSGErro(form) {
    form.querySelectorAll('.show-error-message').forEach(function (item) {
        item.classList.remove('show-error-message');
    });
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
    excluirMSGErro(form);
    verificarCamposVazios(username, email, password, password2);
    let usuario = {
        username: username.value,
        email: email.value,
        password: password.value
    };
    console.log(usuario);
    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
    button.disabled = true;
});
function apresentaMSGErro(input, msg) {
    let formField = input.parentElement;
    let errorMessage = formField.querySelector('.error-message');
    errorMessage.innerText = msg;
    formField.classList.add('show-error-message');
}
form.querySelectorAll('input').forEach(elemento => {
    elemento.addEventListener('blur', (event) => {
        event.preventDefault();
        if (!elemento.value) {
            apresentaMSGErro(elemento, 'O campo não pode ser vazio!');
        }
        else {
            let formField = elemento.parentElement;
            formField.classList.remove('show-error-message');
            if (elemento.className == 'password') {
                verificarSenhaCurta(password);
            }
            if (elemento.className == 'password2') {
                verificarSenhaDiferentes(password, password2);
            }
        }
        habilitarBotaoSubmit(form);
    });
});
function verificarSenhaCurta(password) {
    if (password.value.length < 8) {
        console.log('Senha muito pequena ...');
        apresentaMSGErro(password, "A senha é muito curta!");
    }
}
function verificarSenhaDiferentes(password, password2) {
    if (password2.value != password.value) {
        console.log('Senhas diferentes');
        apresentaMSGErro(password2, "As senhas diferem!");
    }
}
