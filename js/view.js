import { exit, entrar, esmaecer } from "./animacoes.js"

export class View{
    constructor(domQuestao, domScreen, domBarra, domInfo, domButton, domLobby,domResult){
        this.domQuestao = domQuestao
        this.domInfo = domInfo
        this.domScreen = domScreen
        this.domBarra = domBarra
        this.domButton = domButton
        this.domLobby = domLobby
        this.domResult = domResult
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

        this.domQuestao.innerHTML = ''
        ordem.forEach(element =>{
            const button = document.createElement('button')
            button.setAttribute('opcao', element)
            button.innerText = `${questao[element]}`
            this.domQuestao.appendChild(button)
        })
    }

    mark(dom, marcado, desmarcar=false){
        if(desmarcar){
            dom.classList.remove(`${marcado}`)
            return
        }
        dom.classList.add(`${marcado}`)
    }

    rodarElemento(dom, qnt){
        dom.style.transform = `rotate(${qnt}deg)`
    }

    btnVerificador(txt, disabled=false){
        this.domButton.innerText = `${txt}`
        this.domButton.disabled = disabled
    }

    changeColor(cor,num){
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

    animacoes(animacao, dom){
        const opcoes = {
            exit: (dom)=>{
                exit(dom)
            },
            entrar: (dom)=>{
                entrar(dom)
            },
            esmaecer:(dom)=>{
                esmaecer(dom)
            }
        }
        if(opcoes[animacao]){
            opcoes[animacao](dom)
        }
    }

    resultados(resumo){
        this.domResult.querySelector('.ponto').innerHTML = `<i>${resumo.pontos}</i>`
        this.domResult.querySelector('.nome').innerHTML = `${resumo.jogador}`
        this.domResult.querySelector('.tempo').innerHTML = resumo.tempo
        this.domResult.querySelector('.qntDeQuestoes').innerHTML = `${resumo.questoes} Questões`
        this.domResult.querySelector('.porcDeAcerto').innerHTML = `${resumo.porcentagem}%`
        this.domResult.querySelector('.mediaTempo').innerHTML = `${resumo.mediaTempo} segundos`
    }
}