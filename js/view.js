import { questoes } from "./app.js";

const tela = document.querySelector('div.screen')

/*export function construirQuestao(questao){
    tela.innerHTML =`
    <p class="titulo"> Questão  </p>
    <p class="pergunta"> ${questao.questao}
    `
    questoes.innerHTML = `
    <button opcao=""> a) ${questao.}</button>
    <button opcao=""> b) ${questao.}</button>
    <button opcao=""> c) ${questao.}</button>
    <button opcao=""> d) ${questao.}</button>
    `


    return array
}*/

export function resetBotoes(dom){
    [...dom.children].forEach(element => {
        if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
        if (element.classList.contains('correto')) element.classList.remove('correto')
        if (element.classList.contains('errado')) element.classList.remove('errado')
    });
}