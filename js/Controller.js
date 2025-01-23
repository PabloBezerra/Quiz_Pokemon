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
            return
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
            tempo: `${this.min < 10 ? '0'+ this.min: this.min}: ${this.sec < 10 ? '0' +this.sec : this.sec}`,
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
        server.reorganizaArray(this.ordem)
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
        if(this.cont === this.maxCont){
            view.btnVerificador('finalizar')
            this.updateTime(true)
        }else{
            view.btnVerificador('Próxima questão', false)
        }
        view.cortina(true)
    }

    // Método responsável pela atualização do tempo
    updateTime(end=false){
        if(!end){
            this.upTimer = setInterval(()=>{
                view.insertTime(server.time())
            }, 1000)
        }else{
            clearInterval(this.upTimer)
        }
    }

    // Método que atualiza a pontuação caso o usuário acerte
    updatePontuacao(plus=false){
        view.insertPontuacao(server.updatePontuacao(plus))
    }

    // Método que muda a cor conforme a cor que o usuário deseja
    changeColor(event, drawer, rotate=true){
        if(event.tagName === 'SPAN'){
            if(drawer.classList.contains('activated')){
                view.mark(drawer, 'activated', true) 
                return
            }
            view.mark(drawer, 'activated')
        }else if(event.classList.contains('color')){
            const color = window.getComputedStyle(event).backgroundColor
            const num = event.getAttribute('color')
            view.changeColor(this.rgbToHex(color), num)
            view.mark(drawer, 'activated', true)
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

    // Metodo que encerra o jogo antes de finalizar
    pause(event){
        const dom = event.parentElement.parentElement
        const opcoes = {
            i_pause:()=>{
                view.mark(dom, 'pausado')
                this.updateTime(true)
            },
            i_continue:()=>{
                view.mark(dom, 'pausado',true)
                this.updateTime()
            },
            i_back:()=>{
                view.mark(dom, 'pausado',true)
                view.mark(dom, 'confirm')
            },
            i_exit:()=>{
                view.mark(dom, 'confirm', true)
                this.reset(dom.parentElement, dom.parentElement.previousElementSibling)
                return
            },
            i_cancel:()=>{
                view.mark(dom, 'confirm', true)
                view.mark(dom, 'pausado')
            }
        }
        if(opcoes[event.id]){
            opcoes[event.id]()
        }
    }

    // Método que reseta todas as configurações necessárias para um novo jogo
    reset(results, lobby){
        server.reset()
        this.cont = 0
        this.maxCont = null
        this.jogador = null
        this.pontuacao = 0
        view.animacoes('exit', results)
        view.animacoes('entrar', lobby)
    }
}