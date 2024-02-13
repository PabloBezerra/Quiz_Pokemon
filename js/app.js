import { exit, entrar, esmaecer } from "./animacoes.js"
import { construirQuestao, resetBotoes, analiseQuestao, updateTime, nome, } from ".View.js"
import { verificaQuestoes, sortearQuestao, selecionaQuestoes } from ".Server.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
export const screen = document.querySelector('.screen')
export const questoes = document.querySelector('.questoes')
export const info = document.querySelector('.info')

let listaDeQuestoes = []
export let currentQuestao = {}

window.addEventListener('load',()=>{
    lobby.style.height = '90%'
})

document.querySelector('.formNickname').addEventListener('submit',function(event){
    event.preventDefault()
    exit(lobby)
    verificaQuestoes(selecionaQuestoes,trazerQuestões)
    entrar(game)
    btnVerificador.disabled = true
    nome(this.querySelector('[type="text"]'))
    updateTime()
})

questoes.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON'){
        btnVerificador.innerHTML = 'Verificar'
        esmaecer(btnVerificador);
        btnVerificador.disabled = false
        resetBotoes()
        event.target.classList.add('selecionado')
    }
})

btnVerificador.addEventListener('click',function(){
    if(this.innerText !== 'Próxima questão'){
        analiseQuestao(questoes.querySelector('.selecionado'))
        this.innerText ='Próxima questão'
        return
    }
    esmaecer(screen, true)
    esmaecer(questoes, true)
    escolherQuestao()
    resetBotoes()
    esmaecer(screen)
    esmaecer(questoes)
    esmaecer(this,true)
    this.disabled = true
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