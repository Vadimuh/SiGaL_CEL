let canv = document.getElementById("theCanvas");
let ctx = canv.getContext("2d");
let chatInput = document.getElementsByClassName("chat")[0];
chatInput.addEventListener('keydown', e => {
    switch(e.key){
        case 'Enter':
            console.log('enter key pressed');
            //take in input
            //push to html array
            sendMessage("Bruh", chatInput.value);
            chatInput.value= "";
            break;
    }
}, false);
//let chatbox = document.getElementsByClassName('chatbox')[0];

//this.socket = new WebsocketHandler(); //handles websocket stuff

//starting board
ctx.fillStyle = "#FEE7E2";
ctx.fillRect(0,0, 800, 600);

// chatbox stores array of message objects
let chatbox = document.getElementById("chatbox");

function sendMessage(name, message, color){
    let chat = document.createTextNode(name + ': ' + message);
    let  chatMessage = document.createElement("LI");
    chatMessage.appendChild(chat);
    //chatMessage.setAttribute("class", "chatMessage");
    chatbox.appendChild(chatMessage);
}
