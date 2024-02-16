import { exit, entrar, esmaecer } from "./animacoes.js"
import { Server } from "./Server.js"
import { View } from "./view.js"
import { Controller } from "./Controller.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
const screen = document.querySelector('.screen')
const questoes = document.querySelector('.questoes')
const info = document.querySelector('.info')

export const view = new View(questoes, screen, info, btnVerificador )
export const server = new Server()
export const controller = new Controller()

window.addEventListener('load',()=>{
    lobby.style.height = '95%'
})

document.querySelector('#idRange').addEventListener('input',function(event){
    this.nextElementSibling.innerText = event.target.value
})

document.querySelector('.formNickname').addEventListener('submit',function(event){
    event.preventDefault()
    exit(lobby)
    controller.start(this.querySelector('[type="text"]'),+this.querySelector('label').innerText)
    entrar(game)
})

questoes.addEventListener('click',function(event){
    if (event.target.tagName === 'BUTTON'){
        view.btnVerificador('Verificar', false)
        view.resetBotoes()
        view.marcar(event.target,'selecionado')
    }
})

btnVerificador.addEventListener('click',function(){
    if(this.innerText === 'Verificar'){
        controller.analiseQuestao(questoes.querySelector('.selecionado'))
        return
    }
    controller.next()
})