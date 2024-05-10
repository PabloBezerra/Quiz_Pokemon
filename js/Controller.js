// Importações
import { view, server } from "./app.js"

// Classe Controladora
export class Controller{
    constructor(){
        this.ordem = [1, 2, 3, 4]
        this.cont = 0
        this.maxCont = null
        this.jogador = null
        this.pontuacao = 0
        this.sec = 0
        this.min = 0
        this.questaoAtual = {}
    }

    // Método que inicializa o jogo
    start(nome, maxCont){
        server.separaQuestoes(maxCont)
        this.maxCont = maxCont
        this.jogador = nome.value
        view.nome(this.jogador)
        this.updateTime()
        this.getQuestao()
        this.updatePontuacao()
    }

    // Método que passa para a próxima questão
    next(game, results){
        if(this.cont === this.maxCont){
            this.end(game, results)
        }
        view.resetBotoes()
        this.getQuestao()
        view.btnVerificador('Verificar', true)
        view.cortina(false)
    }

    // Método que finaliza o jogo e chama a tela de resultados
    end(game, results){
        const resumo = {
            jogador: this.jogador,
            tempo: `${this.min < 10 ? '0'+ this.min: this.min}: ${this.sec}`,
            pontos: `${this.pontuacao < 10 ? '0' + this.pontuacao : this.pontuacao}`,
            questoes: this.maxCont,
            porcentagem: (this.pontuacao * 100 )/this.maxCont,
            mediaTempo: ((this.min * 60) + this.sec ) /this.maxCont,
        }
        view.animacoes('exit',game)
        view.resultados(resumo)
        this.updateTime(true)
        view.animacoes('entrar', results)
        return
    }

    // Método que recupera uma questão do server e manda contruir na tela
    getQuestao(){
        this.cont++
        this.questaoAtual = server.selecionaQuestao()
        this.reorganizaArray(this.ordem)
        view.construirQuestao(this.ordem, this.cont, this.questaoAtual, this.maxCont)
    }

    // Método que analiza a questão 
    analiseQuestao(selecionado){
        const correto = this.questaoAtual.correto
        if(selecionado.getAttribute('opcao') === correto){
            view.mark(selecionado, 'correto')
            this.updatePontuacao(true)
        }else{
            view.mark(selecionado.parentElement.querySelector(`[opcao="${correto}"]`), 'correto')
            view.mark(selecionado, 'errado')
        }
        view.btnVerificador(this.cont === this.maxCont ? 'Finalizar':'Próxima questão', false)
        view.cortina(true)
    }

    // Método genérico que reorganiza uma array
    reorganizaArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Método responsável pela contágem do tempo
    time(){
        this.sec += 1
        if(this.sec >= 60){
            this.sec = 0
            this.min += 1
        }
        view.insertTime(this.min, this.sec)
    }

    // Método responsável pela atualização do tempo
    updateTime(end=false){
        if(!end){
            setInterval(()=>{this.time()}, 1000)
        }else{
            clearInterval(this.time)
        }
    }

    // Método que atualiza a pontuação caso o usuário acerte
    updatePontuacao(plus=false){
        plus ? this.pontuacao++ : this.pontuacao
        view.insertPontuacao(this.pontuacao)
    }

    // Método que muda a cor conforme a cor que o usuário deseje
    changeColor(event, drawer){
        if(event.tagName === 'SPAN'){
            if(drawer.classList.contains('activated')){
                view.mark(drawer, 'activated', true)
                view.rodarElemento(drawer.lastElementChild, -90)
                return
            }
            view.mark(drawer, 'activated')
            view.rodarElemento(drawer.lastElementChild, 90)
        }else if(event.classList.contains('color')){
            const color = window.getComputedStyle(event).backgroundColor
            const num = event.getAttribute('color')
            view.changeColor(this.rgbToHex(color), num)
            view.mark(drawer, 'activated', true)
            view.rodarElemento(drawer.lastElementChild, -90)
        }
    }

    // Método que converte cada parte do RGB para hexadecimal e formatando
    rgbToHex(rgb) {
        if (/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(rgb)) {
            const partes = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            delete(partes[0]);
            for (let i = 1; i <= 3; ++i) {
                partes[i] = parseInt(partes[i], 10).toString(16);
                if (partes[i].length == 1) partes[i] = '0' + partes[i];
            }
            return '#' + partes.join('');
        }
        else {
            return rgb;
        }
    }

    // Método que reseta todas as configurações necessárias para um novo jogo
    reset(results, lobby){
        this.cont = 0
        this.maxCont = null
        this.jogador = null
        this.pontuacao = 0
        this.sec = 0
        this.min = 0
        view.animacoes('exit', results)
        view.animacoes('entrar', lobby)
    }
}