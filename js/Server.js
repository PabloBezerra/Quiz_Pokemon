export class Server{
    constructor(){
        this.url = './questoes.json'
        this.questoesSelecionadas = []
    }

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
    
    selecionaQuestao(){
        const currentQuestao = this.sortearQuestao(this.questoesSelecionadas)
        this.questoesSelecionadas.splice(this.questoesSelecionadas.indexOf(currentQuestao), 1)
        return currentQuestao
    }

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