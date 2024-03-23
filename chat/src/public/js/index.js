const socket = io();
let user
let chatBox = document.getElementById('chatBox');
Swal.fire({
    title: "Identificar",
    input: "text",
    text: "Digite seu nome!",
    inputValidator: (value) => {
        return !value && "Você precisa escrever seu nome!";
    },
    allowOutsideClick: false,
}).then((result) => {
    user = result.value;
    socket.emit('userName', user);
});

socket.on("userConnected", (user) => {
    console.log("userConnected", user);
    Swal.fire({
        icon: "info",
        title: "Novo Usuário",
        text: `${user} entrou na sala!`
    });
});

chatBox.addEventListener('keyup', (e) => {
    console.log("keyup", e.key);
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {

            console.log("enviando mensagem", chatBox.value);
            socket.emit('message', { user: user, message: chatBox.value });
            chatBox.value = '';
        }
    }
});

socket.on('messageLogs', (data) => {
    console.log("recebendo mensagem", data);
    let logs = document.getElementById('messageLogs');
    let messages = ""
    data.forEach((message) => {
        messages = messages + `${message.user} diz: ${message.message} <br>`;
    });
    logs.innerHTML = messages;
});





// Swal.fire({
//     title: 'Identificar',
//     input: 'text',
//     text: 'Digite seu nome!',
//     inputValidator: (value) => {
      
//         return !value && 'Você precisa escrever seu nome!'
//     },
//     allowOutsideClick: false,
//   }).then((result) => {   
//       user = result.value;
    
// });