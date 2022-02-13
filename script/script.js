let statusEnvio = null; 
let userName = null;
let objName = {};
let messages = [];
let statusMessage = [];
let textMessage = [];
let totalMessages = [];
function user(){
    userName = prompt("Digite seu nome");
    objName = {
        name: `${userName}`
    }
    let send = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", objName);
    send.then(sucess);
    send.catch(error);
}

function sucess(sucesso){
    statusEnvio = sucesso.status;
    setInterval(online, 5000);
    setInterval(reciveMessages, 3000);
    console.log(statusEnvio);
}

function error(){
    user();
}

function online(){
    let send = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", objName);
}

function reciveMessages(){
    messages = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    messages.then(showMessages);
    messages.catch(error);
}

function showMessages(mensagens){
    totalMessages = mensagens.data;
    totalMessages.forEach(element => {
        if (element.type === "status"){
            let messagesText = document.querySelector(".messages");
            messagesText.innerHTML += `<p class="status"><span class="claro">(${element.time})</span> <b>${element.from}</b> ${element.text}</p>`;
        } else if (element.type === "message"){
            let messagesText = document.querySelector(".messages");
            messagesText.innerHTML += `<p class="mensagem"><span class="claro">(${element.time})</span> <b>${element.from}</b> para <b>${element.to}</b>: ${element.text}</p>`;
        }
    });
}

function sendMessage(){

}

function showStatus(){
    let messagesText = document.querySelector(".messages");
    messagesText.innerHTML += `<p class="status"><span class="claro">(${statusMessage.time})</span> <b>${message.from}</b> ${message.text}</p>`;
}

user();