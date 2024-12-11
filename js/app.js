// Importações
import { Server } from "./Server.js"
import { View } from "./View.js"
import { Controller } from "./Controller.js"

// Variaveis
const lobby = document.querySelector('.lobby')
const game = document.querySelector('.game')
const btnVerificador = document.querySelector('.verificador')
const screen = document.querySelector('.screen')
const barra = document.querySelector('.barra')
const questoes = document.querySelector('.buttons')
const info = document.querySelector('.info')
const drawer = document.querySelector('.colorDrawer')
const results = document.querySelector('.result')
const config = document.querySelector('.config')

// Instâncias
export const view = new View(questoes, screen, barra.firstElementChild, info, btnVerificador, lobby, results )
export const server = new Server()
export const controller = new Controller()

// Evento ao carregar a página
window.addEventListener('load',()=>{
    lobby.style.height = '95%'
    controller.changeColor(server.sortearQuestao(drawer.querySelectorAll('.color')), drawer,false)
    view.animacoes('shake',drawer.querySelector('span'))          
})

// Evento ao Modificar a quantidade de questões
document.querySelector('#idRange').addEventListener('input',function(event){
    this.previousElementSibling.innerText = event.target.value
})

// Evento ao enviar ao enviar o formulário
document.querySelector('.formNickname').addEventListener('submit',function(event){
    event.preventDefault()
    view.animacoes('exit', lobby)
    controller.start(this.querySelector('[type="text"]'), + this.querySelector('.range').innerText)
    view.animacoes('entrar', game)
})

//Evento ao clicar na opção home
config.addEventListener('click', function(event){
    controller.pause(event.target)
})

// Evento ao clicar e selecionar as alternativas das questões
questoes.addEventListener('click', function (event){
    if (event.target.tagName === 'BUTTON'){
        view.btnVerificador('Verificar', false)
        view.resetBotoes()
        view.mark(event.target,'selecionado')
    }
})

// Evento ao clicar no botão de verificar a alternativa e proxima questão
btnVerificador.addEventListener('click',function(){
    if(this.innerText === 'Verificar'){
        controller.analiseQuestao(questoes.querySelector('.selecionado'))
        return
    }
    controller.next(game, results)
})

// Evento ao clicar no botão de ativação da gaveta de cores
drawer.addEventListener('click', (event)=>{
    if(event.target.tagName === 'SPAN'){
        controller.changeColor(event.target, drawer)
    }else if(event.target.classList.contains('color')){
        controller.changeColor(event.target, drawer)
    }else{
        drawer.classList.remove('activated')
    }
})

// Evento ao clicar no botão de reset do jogo
results.querySelector('button').addEventListener('click',()=>{
    controller.reset(results, lobby)
})
