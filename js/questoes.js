export async function verificaQuestoes(cb1,cb2){
    await fetch('./questoes.json')
    .then((res => res.json()))
    .then(quests => cb1(quests,cb2))
    .catch(error => console.log(error))
}

export function selecionaQuestoes(questoes, cb){
    let questoesSelecionadas = []
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




/*{
    "questao": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "correto":""
}*/