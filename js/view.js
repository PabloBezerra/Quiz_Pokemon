import { esmaecer } from "./animacoes.js"

export class View{
    constructor(domQuestao, domScreen, domInfo, domButton){
        this.domQuestao = domQuestao
        this.domInfo = domInfo
        this.domScreen = domScreen
        this.domButton = domButton
    }

    nome(nome){
        this.domInfo.querySelector('.jogador').innerText = nome.value
    }

    insertTime(min,sec){
        this.domInfo.querySelector('.timer').innerText = `${min < 10 ? '0' + min : min }:${sec < 10 ? '0' + sec : sec}`
    }

    insertPontuacao(pontuacao){
        this.domInfo.querySelector('.pontuacao').innerText =` ${pontuacao} Ponto${pontuacao=== 1? '':'s'}`
    }

    construirQuestao(ordem, cont, questao, maxCont){
        this.domScreen.innerHTML =`
        <p class="titulo"> Questão ${cont} de ${maxCont} </p>
        <p class="pergunta"> ${questao.questao}
        `
        this.domQuestao.innerHTML = `
        <button opcao="${ordem[0]}"> <span>A</span> ${questao[ordem[0]]}</button>
        <button opcao="${ordem[1]}"> <span>B</span> ${questao[ordem[1]]}</button>
        <button opcao="${ordem[2]}"> <span>C</span> ${questao[ordem[2]]}</button>
        <button opcao="${ordem[3]}"> <span>D</span> ${questao[ordem[3]]}</button>
    `
    }

    marcar(dom, marcado){
        dom.classList.add(`${marcado}`)
    }

    btnVerificador(txt, disabled=false){
        this.domButton.innerText = `${txt}`
        esmaecer(this.domButton)
        this.domButton.disabled = disabled
    }

    tabela(){
        return
    }

    resetBotoes(){
        [...this.domQuestao.querySelectorAll('button')].forEach(element => {
            if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
            if (element.classList.contains('correto')) element.classList.remove('correto')
            if (element.classList.contains('errado')) element.classList.remove('errado')
        });
    }
}