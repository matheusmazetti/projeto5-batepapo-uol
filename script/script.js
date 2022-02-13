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
    let clearHtml = document.querySelector(".messages");
    clearHtml.innerHTML = "";
    totalMessages = mensagens.data;
    totalMessages.forEach(element => {
        if (element.type === "status"){
            let messagesText = document.querySelector(".messages");
            messagesText.innerHTML += `<p class="status" data-identifier="message"><span class="claro">(${element.time})</span> <span class="bold">${element.from}</span> ${element.text}</p>`;
        } else if (element.type === "message"){
            let messagesText = document.querySelector(".messages");
            messagesText.innerHTML += `<p class="mensagem" data-identifier="message"><span class="claro">(${element.time})</span> <span class="bold">${element.from}</span> para <span class="bold">${element.to}</span>: ${element.text}</p>`;
        }
    });
}

function sendMessage(){
    let messageText = document.querySelector(".message").value;
    let send = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",{
        from: `${userName}`,
        to: "Todos",
        text: `${messageText}`,
        type: "message"
    })
    send.catch(restart);
}

function restart(){
    window.location.reload();
}

function showStatus(){
    let messagesText = document.querySelector(".messages");
    messagesText.innerHTML += `<p class="status"><span class="claro">(${statusMessage.time})</span> <b>${message.from}</b> ${message.text}</p>`;
}

user();