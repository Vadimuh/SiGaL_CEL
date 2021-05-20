
let url = window.location.href;
let lobby_id_start = url.lastIndexOf("/") + 1;

let lobby_id = parseInt(url.substring(lobby_id_start, url.length));


(() => {
    class WebsocketHandler {
        setupSocket(lobby_id) {
            this.socket = new WebSocket("ws://" + location.host + "/ws/lobby/" + lobby_id);

            this.socket.addEventListener("message" , (event) => {
                const pTag = document.createElement("p");
                pTag.innerHTML = event.data;

                document.getElementById("main").append(pTag);
            });

            this.socket.addEventListener("close", () => {
                this.setupSocket(lobby_id);
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
    WebsocketClass.setupSocket(lobby_id);

    document.getElementById("button")
        .addEventListener("click", (event) => WebsocketClass.submit(event));
})()
