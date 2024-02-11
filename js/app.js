import { exit, entrar, esmaecer } from "./animacoes.js"
import { construirQuestao, resetBotoes} from "./view.js"
import { verificaQuestoes, sortearQuestao, selecionaQuestoes } from "./questoes.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
export const questoes = document.querySelector('.questoes')

let listaDeQuestoes = []
export let currentQuestao = {}

window.addEventListener('load',()=>{
    lobby.style.height = '90%'
})

document.querySelector('.formNickname').addEventListener('submit',(event)=>{
    event.preventDefault()
    exit(lobby)
    verificaQuestoes(selecionaQuestoes,trazerQuestões)
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

btnVerificador.addEventListener('click',function(){
    if(this.innerText === 'Próxima questão') return
    
})

async function trazerQuestões(questoes){
    await questoes
    listaDeQuestoes = questoes
    escolherQuestao()
}

function escolherQuestao(){
    currentQuestao = sortearQuestao(listaDeQuestoes)
    construirQuestao(currentQuestao)
    listaDeQuestoes.splice(listaDeQuestoes.indexOf(currentQuestao), 1)
}