import { Server } from "./Server.js"
import { View } from "./View.js"
import { Controller } from "./Controller.js"

const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
const screen = document.querySelector('.screen')
const barra = document.querySelector('.barra')
const questoes = document.querySelector('.buttons')
const info = document.querySelector('.info')
const drawer = document.querySelector('.colorDrawer')
const results = document.querySelector('.result')

export const view = new View(questoes, screen, barra.firstElementChild, info, btnVerificador, lobby, results )
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
    view.animacoes('exit', lobby)
    controller.start(this.querySelector('[type="text"]'),+this.querySelector('label').innerText)
    view.animacoes('entrar', game)
})

questoes.addEventListener('click', function (event){
    if (event.target.tagName === 'BUTTON'){
        view.btnVerificador('Verificar', false)
        view.resetBotoes()
        view.mark(event.target,'selecionado')
    }
})

btnVerificador.addEventListener('click',function(){
    if(this.innerText === 'Verificar'){
        controller.analiseQuestao(questoes.querySelector('.selecionado'))
        questoes.nextElementSibling.style.width = '100%'
        return
    }
    controller.next(game, results)
    questoes.nextElementSibling.style.width = 'auto'
})

drawer.addEventListener('click', (event)=>{
    if(event.target.tagName === 'SPAN'){
        controller.changeColor(event.target, drawer)
        
    }else if(event.target.classList.contains('color')){
        controller.changeColor(event.target, drawer)
    }else{
        drawer.classList.remove('activated')
    }
})

results.querySelector('button').addEventListener('click',()=>{
    controller.reset(results, lobby)
})
