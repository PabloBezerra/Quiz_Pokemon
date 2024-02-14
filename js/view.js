export class View{
    constructor(domQuestao, domScreen, domInfo){
        this.domQuestao = domQuestao
        this.domInfo = domInfo
        this.domScreen = domScreen
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
        <button opcao="${ordem[0]}"> a) ${questao[ordem[0]]}</button>
        <button opcao="${ordem[1]}"> b) ${questao[ordem[1]]}</button>
        <button opcao="${ordem[2]}"> c) ${questao[ordem[2]]}</button>
        <button opcao="${ordem[3]}"> d) ${questao[ordem[3]]}</button>
    `
    }

    marcar(dom, marcado){
        dom.classList.add(`${marcado}`)
    }

    resetBotoes(){
        [...this.domQuestao.querySelectorAll('button')].forEach(element => {
            if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
            if (element.classList.contains('correto')) element.classList.remove('correto')
            if (element.classList.contains('errado')) element.classList.remove('errado')
        });
    }
}