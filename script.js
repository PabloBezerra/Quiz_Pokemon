const lobby = document.querySelector('.lobby')

window.addEventListener('load',()=>{
    lobby.style.height = '90%'
})

document.querySelector('.formNickname').addEventListener('submit',(event)=>{
    event.preventDefault()
    exit(lobby)
})

function exit(element){
    element.style.animation = 'exit 1s'
    setTimeout(()=>{
        element.style.display = 'none'
    }, 900)
}