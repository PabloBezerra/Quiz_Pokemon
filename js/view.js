import { questoes, currentQuestao } from "./app.js";

const tela = document.querySelector('div.screen')
const info = document.querySelector('div.info')
const ordem = [1, 2, 3, 4]
let cont = 0

export function construirQuestao(){
    cont++
    const reordem = reorganizaArray(ordem)
    tela.innerHTML =`
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

function analiseQuestao(){
    const correto = currentQuestao.correto
    
}

export function resetBotoes(dom){
    [...dom.children].forEach(element => {
        if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
        if (element.classList.contains('correto')) element.classList.remove('correto')
        if (element.classList.contains('errado')) element.classList.remove('errado')
    });
}

function reorganizaArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }