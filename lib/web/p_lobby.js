
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

            this.socket.addEventListener("message" , (event) => {
                const pTag = document.createElement("p");
                pTag.innerHTML = event.data;

                document.getElementById("main").append(pTag);
            });

            this.socket.addEventListener("close", () => {
                this.setupSocket(lobby_id, user_id);
            });
        }

        submit(event) {
            event.preventDefault();
            const input = document.getElementById("message");
            const message = input.value;
            input.value = "";
            
            this.socket.send(
                JSON.stringify({
                    data: {message: message},
                })
            );
        }
    }

    const WebsocketClass = new WebsocketHandler();
    WebsocketClass.setupSocket(lobby_id, user_id);

    document.getElementById("button")
        .addEventListener("click", (event) => WebsocketClass.submit(event));
})()
