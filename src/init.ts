interface Usuario{
    username: string;
    email: string;
    password: string;
}

const form = document.querySelector('.form') as HTMLFormElement;
const username = document.querySelector('.username') as HTMLInputElement;
const email = document.querySelector('.email') as HTMLInputElement;
const password = document.querySelector('.password') as HTMLInputElement;
const password2 = document.querySelector('.password2') as HTMLInputElement;
const button = document.querySelector('button') as HTMLButtonElement;

button.disabled = true;

function habilitarBotaoSubmit(form: HTMLFormElement){
    let erros: NodeListOf<Element> = form.querySelectorAll('.show-error-message');
    if(erros.length > 0){
        button.disabled = true;
    }else{
        button.disabled = false;
    }
}

function verificarCamposVazios(...inputs: HTMLInputElement[]):void{
    inputs.forEach((campo) => {
        if(!campo.value){
            console.log(`${campo.className} está vazio!`);
            apresentaMSGErro(campo, 'O campo não pode ser vazio!');
        }
    })
}

function excluirMSGErro(form: HTMLFormElement):void {
    form.querySelectorAll('.show-error-message').forEach(function(item){
        item.classList.remove('show-error-message');
    });
}

form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    excluirMSGErro(form);
    verificarCamposVazios(username, email, password, password2);

    let usuario: Usuario = {
        username: username.value,
        email: email.value,
        password: password.value
    }

    console.log(usuario);

    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
    button.disabled = true;
});

function apresentaMSGErro(input: HTMLInputElement, msg: string){
    let formField = input.parentElement as HTMLDivElement;
    let errorMessage = formField.querySelector('.error-message') as HTMLSpanElement;
    errorMessage.innerText = msg;
    formField.classList.add('show-error-message');
}

form.querySelectorAll('input').forEach(elemento => {
    elemento.addEventListener('blur', (event) => {
        event.preventDefault();
        if(!elemento.value){
            apresentaMSGErro(elemento, 'O campo não pode ser vazio!');
        }else{
            let formField = elemento.parentElement as HTMLDivElement;
            formField.classList.remove('show-error-message');
            if(elemento.className == 'password'){
                verificarSenhaCurta(password);
            }
            if(elemento.className == 'password2'){
                verificarSenhaDiferentes(password, password2);
            }
        }
        habilitarBotaoSubmit(form);
    })
})


function verificarSenhaCurta(password: HTMLInputElement): void {
    if(password.value.length < 8){
        console.log('Senha muito pequena ...');
        apresentaMSGErro(password, "A senha é muito curta!");
    }
}

function verificarSenhaDiferentes(password: HTMLInputElement, password2: HTMLInputElement): void {
    if(password2.value != password.value){
        console.log('Senhas diferentes');
        apresentaMSGErro(password2, "As senhas diferem!");
    }
}

