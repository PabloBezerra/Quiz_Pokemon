import { exit, entrar, esmaecer } from "./animacoes.js"
import { resetBotoes } from "./resets.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
const questoes = document.querySelector('.questoes')

window.addEventListener('load',()=>{
    lobby.style.height = '90%'
})

document.querySelector('.formNickname').addEventListener('submit',(event)=>{
    event.preventDefault()
    exit(lobby)
    entrar(game)
})

questoes.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON'){
        btnVerificador.innerHTML = 'Verificar'
        esmaecer(btnVerificador);
        resetBotoes(questoes)
        event.target.classList.add('selecionado')
    }
})

