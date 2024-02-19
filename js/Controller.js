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
            const resumo = {
                jogador: this.jogador,
                tempo: `${this.min}: ${this.sec}`,
                pontos: this.pontuacao
            }
            view.tabela(resumo)
            this.reset()
            this.updateTime(true)
            return
        }
        view.resetBotoes()
        this.getQuestao()
        view.btnVerificador('Verificar', true)
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
        view.btnVerificador(this.cont === this.maxCont ? 'Finalizar':'Próxima questão', false)
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

    mudarCor(event, gaveta){
        if(event.tagName === 'SPAN'){
            if(gaveta.classList.contains('ativado')){
                view.marcar(gaveta, 'ativado', true)
                return
            }
            view.marcar(gaveta, 'ativado')
        }else if(event.classList.contains('cor')){
            const cor = window.getComputedStyle(event).backgroundColor
            const num = event.getAttribute('cor')
            view.mudarCor(this.rgbParaHex(cor), num)
            view.marcar(gaveta, 'ativado', true)
        }
    }

    // Convertendo cada parte do RGB para hexadecimal e formatando
    rgbParaHex(rgb) {
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

    reset(){
        this.cont = 0
        this.maxCont = null
        this.jogador = null
        this.pontuacao = 0
        this.sec = 0
        this.min = 0
    }
}