import {buscarListaDeQuestoes} from './app.js'

export function selecionaQuestoes(questoes, cb){    
    const questoesSelecionadas = []
  
    while (questoesSelecionadas.length < 10){
        const questao = sortearQuestao(questoes)
        if(questao !== undefined && !questoesSelecionadas.includes(questao) ){
            questoesSelecionadas.push(questao)
        }
    }
    cb(questoesSelecionadas)
}

export function sortearQuestao(array){
    const questaoSorteada = Math.floor(Math.random() * (array.length))
    return array[questaoSorteada]
}

export function verificaQuestoes(cb){
    const url = './questoes.json'
    const json = new XMLHttpRequest()
    json.open('GET', url)
    json.send(null)
    json.onreadystatechange = function(){
        if(json.readyState === 4){
            if(json.status === 200 || json.status === 304){
                const dados = JSON.parse(json.response)
                if(typeof cb === 'function'){
                    cb(dados, buscarListaDeQuestoes)
                }
            }else{
                alert("Algo deu errado com as questões. Por favor recarregue a página")
            }
        }
    }
}



// {
//     "questao": "",
//     "1": "",
//     "2": "",
//     "3": "",
//     "4": "",
//     "correto":""
// }