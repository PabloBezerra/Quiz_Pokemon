import { questoes, currentQuestao, screen, info } from "./app.js";

const ordem = [1, 2, 3, 4]
let cont = 0
let pontuacao = 0
let sec = 0
let min = 0

function time(){
    sec += 1
    if(sec >= 60){
        sec = 0
        min += 1
    }
    info.firstElementChild.innerText = `${min < 10 ? '0' + min : min }:${sec < 10 ? '0' + sec : sec}`
}

export function updateTime(){
    setInterval(time, 1000)
}

export function nome(nome){
    info.lastElementChild.firstElementChild.innerText = nome.value
}

export function UpdatePontuacao(){
    pontuacao++
    info.lastElementChild.lastElementChild.innerText = pontuacao
}

export function construirQuestao(){
    cont++
    const reordem = reorganizaArray(ordem)
    screen.innerHTML =`
    <p class="titulo"> Questão ${cont} </p>
    <p class="pergunta"> ${currentQuestao.questao}
    `
    questoes.innerHTML = `
    <button opcao="${reordem[0]}"> a) ${currentQuestao[reordem[0]]}</button>
    <button opcao="${reordem[1]}"> b) ${currentQuestao[reordem[1]]}</button>
    <button opcao="${reordem[2]}"> c) ${currentQuestao[reordem[2]]}</button>
    <button opcao="${reordem[3]}"> d) ${currentQuestao[reordem[3]]}</button>
`
}

export function analiseQuestao(selecionado){
    const correto = currentQuestao.correto
    if(selecionado.getAttribute('opcao') === correto){
        selecionado.classList.add('correto')
        UpdatePontuacao()
    }else{
        questoes.querySelector(`[opcao="${correto}"]`).classList.add('correto')
        selecionado.classList.add('errado')
    }
}

export function resetBotoes(){
    [...questoes.querySelectorAll('button')].forEach(element => {
        if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
        if (element.classList.contains('correto')) element.classList.remove('correto')
        if (element.classList.contains('errado')) element.classList.remove('errado')
    });
}

function reorganizaArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

export class View{
    constructor(){
        
    }
}