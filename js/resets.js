export function resetBotoes(dom){
    [...dom.children].forEach(element => {
        if (element.classList.contains('selecionado')) element.classList.remove('selecionado')
        if (element.classList.contains('correto')) element.classList.remove('correto')
        if (element.classList.contains('errado')) element.classList.remove('errado')
    });
}