
if (typeof user_id === "undefined" || !Number.isInteger(user_id))
{
	if(typeof nickname === "undefined")
	{
		let baseNames = ["Alpha", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India",
						 "Juliet", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec",
						 "Romeo", "Sierra", "Tango", "Uniform", "Whiskey", "X-Ray", "Yankee", "Zulu"
						];
				
		let baseName = baseNames[Math.floor(Math.random() * 26)];
		let digits = Math.floor(Math.random() * 1000) + "";
		window.nickname = baseName + digits.padStart(3, "0");
	}
	registerNickname(nickname);
}



// --------------------Chat Function / Lobby ID-------------------
let url = window.location.href;
let lobby_id_start = url.lastIndexOf("/") + 1;

let lobby_id = parseInt(url.substring(lobby_id_start));


(() => {
    class WebsocketHandler {
        setupSocket(lobby_id, user_id) {
            this.socket = new WebSocket("ws://" + location.host + "/ws/lobby/" + lobby_id + "/" + user_id);

            this.socket.addEventListener("message", this.onMessage);

            this.socket.addEventListener("close", () => {
                this.setupSocket(lobby_id, user_id);
            });
        }

        sendChatMessage(event) {
            event.preventDefault();
            const input = document.getElementById("message");
            const message = input.value;
            input.value = "";
            
            // this.socket.send(
            //     JSON.stringify({
            //         data: {message: message},
            //     })
            // );

            this.socket.send(
                JSON.stringify({
                    action: "chat", 
                    data: message
                })
            );
        }

        onMessage(event) {
            let info = JSON.parse(event.data);
            if (info.action === "chat_update")
            {
                const pTag = document.createElement("p");
                pTag.innerHTML = `${info.data.nickname}: ${info.data.message}`;

                document.getElementById("main").append(pTag);
            }
            else if(info.action === "user_join")
            {
                console.log(`user ${info.data} joined`);
            }
            else if(info.action === "user_left")
            {
                console.log(`user ${info.data} has left`);
            }
            else if(info.action === "get_nicknames")
            {
                console.log(`list of nicknames in Lobby: ${info.data}`);
            }
        }
    }

    window.ws = new WebsocketHandler();
    ws.setupSocket(lobby_id, user_id);

    document.getElementById("button")
        .addEventListener("click", (event) => ws.sendChatMessage(event));
})()
