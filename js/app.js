import { exit, entrar, esmaecer } from "./animacoes.js"
import { resetBotoes,  } from "./view.js"
import { verificaQuestoes,sortearQuestao, selecionaQuestoes } from "./questoes.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
export const questoes = document.querySelector('.questoes')

let listaDeQuestoes = []

window.addEventListener('load',()=>{
    lobby.style.height = '90%'
})

document.querySelector('.formNickname').addEventListener('submit',(event)=>{
    event.preventDefault()
    exit(lobby)
    verificaQuestoes(selecionaQuestoes)
    escolherQuestao()
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

export function buscarListaDeQuestoes(questoes){
    listaDeQuestoes = questoes
}

function escolherQuestao(){
    console.log(listaDeQuestoes)
    const questao = sortearQuestao(listaDeQuestoes)
    listaDeQuestoes.splice(listaDeQuestoes.indexOf(questao), 1)
}