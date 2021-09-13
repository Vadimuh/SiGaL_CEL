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

function sendMessage(name, message){
    let chat = document.createTextNode(name + ': ' + message);
    let  chatMessage = document.createElement("LI");
    chatMessage.appendChild(chat);
    chatMessage.style.color = nameToColor(name);
    //chatMessage.setAttribute("class", "chatMessage");
    chatbox.appendChild(chatMessage);
}

//create hash so each name has a randomly assigned color
//https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
function nameToColor(name){
    let hash = 0;
    for (var i = 0; i < str.length; i++) {
        name = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}