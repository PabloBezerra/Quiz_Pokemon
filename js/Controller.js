import { view, server } from "./app.js"

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

    async start(nome, maxCont){
        await server.separaQuestoes(maxCont)
        this.maxCont = maxCont
        this.nomeJogador(nome)
        this.updateTime()
        this.getQuestao()
        this.updatePontuacao()
    }

    next(){
        if(this.cont === this.maxCont){
            this.end()
        }
        view.resetBotoes()
        this.getQuestao()
    }

    end(){

    }

    nomeJogador(nome){
        this.jogador = nome.value
        view.nome(nome)
    }

    getQuestao(){
        this.cont++
        this.questaoAtual = server.selecionaQuestao()
        this.reorganizaArray(this.ordem)
        view.construirQuestao(this.ordem, this.cont, this.questaoAtual, this.maxCont)
    }

    analiseQuestao(selecionado){
        const correto = this.questaoAtual.correto
        if(selecionado.getAttribute('opcao') === correto){
            view.marcar(selecionado, 'correto')
            this.updatePontuacao(true)
        }else{
            view.marcar(selecionado.parentElement.querySelector(`[opcao="${correto}"]`), 'correto')
            view.marcar(selecionado, 'errado')
        }
    }

    reorganizaArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    time(){
        this.sec += 1
        if(this.sec >= 60){
            this.sec = 0
            this.min += 1
        }
        view.insertTime(this.min, this.sec)
    }
    
    updateTime(end=false){
        if(!end){
            setInterval(()=>{this.time()}, 1000)
        }else{
            clearInterval(this.time)
        }
    }

    updatePontuacao(plus=false){
        plus ? this.pontuacao++ : this.pontuacao
        view.insertPontuacao(this.pontuacao)
    }
}