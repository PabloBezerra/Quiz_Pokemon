import { esmaecer } from "./animacoes.js"

export class View{
    constructor(domQuestao, domScreen, domBarra, domInfo, domButton, domLobby){
        this.domQuestao = domQuestao
        this.domInfo = domInfo
        this.domScreen = domScreen
        this.domBarra = domBarra
        this.domButton = domButton
        this.domLobby = domLobby
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
        this.domBarra.style.transform = `translateX(${((cont*100)/maxCont) - 100}%)`

        this.domQuestao.innerHTML = `
        <button opcao="${ordem[0]}"> <span class="bgColor" >A</span> ${questao[ordem[0]]}</button>
        <button opcao="${ordem[1]}"> <span class="bgColor" >B</span> ${questao[ordem[1]]}</button>
        <button opcao="${ordem[2]}"> <span class="bgColor" >C</span> ${questao[ordem[2]]}</button>
        <button opcao="${ordem[3]}"> <span class="bgColor" >D</span> ${questao[ordem[3]]}</button>
    `
    }

    marcar(dom, marcado, desmarcar=false){
        if(desmarcar){
            dom.classList.remove(`${marcado}`)
            return
        }
        dom.classList.add(`${marcado}`)
    }

    btnVerificador(txt, disabled=false){
        this.domButton.innerText = `${txt}`
        this.domButton.disabled = disabled
    }

    tabela(){
        return
    }

    mudarCor(cor,num){
        console.log(cor);
        [...document.querySelectorAll('.color')].forEach(element =>{ element.style.color = `${cor}`});
        [...document.querySelectorAll('.bgColor')].forEach(element =>{element.style.backgroundColor = `${cor}`});
        [...document.querySelectorAll('.borderColor')].forEach(element =>{element.style.borderColor = `${cor}`});
        this.domLobby.querySelector('img').src = `./images/cerebro-${num}.png`
    }

    resetBotoes(){
        [...this.domQuestao.querySelectorAll('button')].forEach(element => {
            if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
            if (element.classList.contains('correto')) element.classList.remove('correto')
            if (element.classList.contains('errado')) element.classList.remove('errado')
        });
    }
}