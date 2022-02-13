let statusEnvio = null; 
let userName = null;
let objName = {};
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
    console.log(statusEnvio);
}
function error(){
    user();
}
function online(){
    let send = axios.post("https://mock-api.driven.com.br/api/v4/uol/status", objName);
    console.log(send);
}

user();