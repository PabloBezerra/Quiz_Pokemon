// Importações
import { allQuests } from "./questoes.js";

// Classe de Serviço
export class Server{
    constructor(){
        this.base = allQuests
        this.questoesSelecionadas = []
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
}

/*{
    "questao": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "correto":""
}*/