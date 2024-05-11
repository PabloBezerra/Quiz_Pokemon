// Importações
import { exit, entrar, esmaecer } from "./animacoes.js"

// Classe de Visualização
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

    // Método que imprime na tela o nome do Jogador
    nome(nome){
        this.domInfo.querySelector('.jogador').innerText = nome
    }

    // Método que atualiza o tempo de jogo 
    insertTime(min,sec){
        this.domInfo.querySelector('.timer').innerText = `${min < 10 ? '0' + min : min }:${sec < 10 ? '0' + sec : sec}`
    }

    // Método que atualiza a pontuação
    insertPontuacao(pontuacao){
        this.domInfo.querySelector('.pontuacao').innerText =` ${pontuacao} Ponto${pontuacao=== 1? '':'s'}`
    }

    // Método que constroi na tela a questão
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

    // Método que adiciona e/ou remove classes de algum elemento
    mark(dom, marcado, desmarcar=false){
        if(desmarcar){
            dom.classList.remove(`${marcado}`)
            return
        }
        dom.classList.add(`${marcado}`)
    }

    // Método que adiciona o efeito de rotação em um elemento
    rodarElemento(dom, qnt){
        dom.style.transform = `rotate(${qnt}deg)`
    }

    // Método que trata do estado do botão verificador de questão
    btnVerificador(txt, disabled=false){
        this.domButton.innerText = `${txt}`
        this.domButton.disabled = disabled
    }

    // Método que impossibilita mais de uma tentativa por questão
    cortina(ativo=true){
        const spans = this.domQuestao.nextElementSibling
        if(ativo){
            spans.style.width = '100%'
            return
        }
        spans.style.width = 'auto'
    }

    // Método que muda a cor de cada elemento selecionado
    changeColor(cor,num){
        [...document.querySelectorAll('.color')].forEach(element =>{ element.style.color = `${cor}`});
        [...document.querySelectorAll('.bgColor')].forEach(element =>{element.style.backgroundColor = `${cor}`});
        [...document.querySelectorAll('.borderColor')].forEach(element =>{element.style.borderColor = `${cor}`});
        this.domLobby.querySelector('img').src = `./images/cerebro-${num}.png`
    }
    
    // Método que reseta os botões de alternativa
    resetBotoes(){
        [...this.domQuestao.querySelectorAll('button')].forEach(element => {
            if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
            if (element.classList.contains('correto')) element.classList.remove('correto')
            if (element.classList.contains('errado')) element.classList.remove('errado')
        });
    }

    // Método que inicia uma animação
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

    // Método responsavel pela contrução da tela de resultados
    resultados(resumo){
        this.domResult.querySelector('.ponto').innerHTML = `<i>${resumo.pontos}</i>`
        this.domResult.querySelector('.nome').innerHTML = `${resumo.jogador}`
        this.domResult.querySelector('.tempo').innerHTML = resumo.tempo
        this.domResult.querySelector('.qntDeQuestoes').innerHTML = `${resumo.questoes} Questões`
        this.domResult.querySelector('.porcDeAcerto').innerHTML = `${resumo.porcentagem}%`
        this.domResult.querySelector('.mediaTempo').innerHTML = `${resumo.mediaTempo} segundos`
    }
}