
let randLobby = Math.floor(Math.random() * 2);

(() => {
    class WebsocketHandler {
        setupSocket(randLobby) {
            this.socket = new WebSocket("ws://" + location.host + "/ws/lobby/" + randLobby);

            this.socket.addEventListener("message" , (event) => {
                const pTag = document.createElement("p");
                pTag.innerHTML = event.data;

                document.getElementById("main").append(pTag);
            });

            this.socket.addEventListener("close", () => {
                this.setupSocket(randLobby);
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
    WebsocketClass.setupSocket(randLobby);

    document.getElementById("button")
        .addEventListener("click", (event) => WebsocketClass.submit(event));
})()
