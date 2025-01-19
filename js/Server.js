// Classe de Serviço
export class Server{
    constructor(){
        this.base = []
        this.questoesSelecionadas = []
        this.sec = 0
        this.min = 0
        this.upTimer = null
    }

    // Método que faz a requisição das questões caso não esteja na memoria
    async recuperaQuestoes(){
        while(!localStorage.getItem('questoes')){
            try{
                const response = await fetch('./questoes.json')
                if(response.ok){
                    const data = await response.json()
                    localStorage.setItem('questoes', `${JSON.stringify(data)}`)
                    this.recuperaQuestoes()
                }
            }catch(e){
                throw Error (e)
            }
        }
        this.base = JSON.parse(localStorage.getItem('questoes'))
        console.log(this.base)
    }

    // Método que separa uma quantidade de questões
    separaQuestoes(qnt){ 
        while (this.questoesSelecionadas.length < qnt){
            const questao = this.sortearQuestao(this.base)
            if(questao !== undefined && !this.questoesSelecionadas.includes(questao) ){
                this.questoesSelecionadas.push(questao)
            }
        }
    }
    
    // Método que seleciona uma questão das selecionadas
    selecionaQuestao(){
        const currentQuestao = this.sortearQuestao(this.questoesSelecionadas)
        this.questoesSelecionadas.splice(this.questoesSelecionadas.indexOf(currentQuestao), 1)
        return currentQuestao
    }

    // Método que sorteia uma questão das selecionadas e a exclui da mesma
    sortearQuestao(array){
        const questaoSorteada = Math.floor(Math.random() * (array.length))
        return array[questaoSorteada]
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
        return{min:this.min, sec:this.sec}
    }

    // Método responsável pela atualização do tempo
    updateTime(end){
        if(!end){
            this.upTimer = setInterval(()=>{this.time()}, 1000)
        }else{
            clearInterval(this.upTimer)
        }
    }

}
