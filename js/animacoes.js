// função de animação de saida do elemento
export function exit(element){
    element.style.animation = 'exit .8s'
    setTimeout(()=>{
        element.style.display = 'none'
    }, 800)
}

// Função de animação da entrada do elemento
export function entrar(element){
    element.style.animation = 'enter .8s'
    setTimeout(()=>{
        element.style.display = 'flex'
    }, 800)
}

// Função de animação de esmaecer o elemento
export function esmaecer(element,reverso=false){
    element.style.animation = `esmaecer${reverso? '-reverso': ''} .8s`
    setTimeout(()=>{
        element.style.opacity = `${reverso? '0': '1'} `
    }, 500)
}