


const socket = io('http://localhost:8000')

var audio = new Audio('ping.mp3')

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container')

const append= (message,position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText=message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if(position =='left'){
        audio.play()
    }
}

form.addEventListener('submit',(Event)=>{
    Event.preventDefault()
    const inputMessage = document.getElementById('messageInp').value
    if(inputMessage != ''){
        append(inputMessage,'right')
        socket.emit('send',inputMessage)   
        document.getElementById('messageInp').value=''
    }else{
        alert("please enter something to send")
    }
   
    
})

const h1 = prompt('Enter your name')
socket.emit('new-user-joined',h1)
 
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,"right")
})

socket.on('receive',data=>{
    
    append(`${data.name}:${data.message}`,'left')
})

socket.on('user-disconnected',data=>{
    append(`${data}: disconnected`)
})
socket.on('left',message=>{
    append(`${message} disconnected`,'left')
})


