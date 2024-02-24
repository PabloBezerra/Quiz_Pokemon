// Classe de Serviço
export class Server{
    constructor(){
        this.url = './questoes.json'
        this.questoesSelecionadas = []
    }

    // Método que faz o requerimento Json e separa uma quantidade de questões
    async separaQuestoes(qnt){
        let quests = null
        try {
            const response = await fetch(this.url);
            quests = await response.json()
        } catch (error) {
            console.log(error);
        }
        while (this.questoesSelecionadas.length < qnt){
            const questao = this.sortearQuestao(quests)
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
}

/*{
    "questao": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "correto":""
}*/