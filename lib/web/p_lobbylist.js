function generateTable(lobbies)
{
    let tableNode = document.getElementById("lobbiesTable");
    let templateNode = document.getElementById("temp");
    let templateRow = templateNode.content.getElementById("rowTemplate");

    for(let i = 0; i < lobbies.length; i++)
    {
        let lobbyData = lobbies[i];
        let cloneRow = templateRow.cloneNode(true);
        let rowData = cloneRow.getElementsByTagName("td");
        rowData[0].innerHTML = lobbyData.host_nickname;
        rowData[1].innerHTML = lobbyData.lobbyname;
        rowData[2].innerHTML = lobbyData.lobbydesc;
        rowData[3].innerHTML = lobbyData.id;
        tableNode.appendChild(cloneRow);
    }
}

//Manually inputting values for a random lobby
function createRandomLobby()
{
    let names = ["john", "kevin", "stacy", "stephen", "mary", "bob"];
    let suffixs = ["'s lobby", "'s clubhouse", "'s MTVcrib", "'s base","'s chez"];
    let lobby_name = names[Math.floor(Math.random() * names.length)];
    lobby_name += suffixs[Math.floor(Math.random() * suffixs.length)];
    let descs = ["gametime", "happytime", "subforsub", "pay2win", "free2play"];
    let lobby_desc = descs[Math.floor(Math.random() * descs.length)];
    createLobby(lobby_name, lobby_desc);
}

let lobby_id = undefined;

function createLobby(lobby_name, lobby_desc)
{
    let gamecode = "";
    let gamerules = "";
    let data = {"user_id": user_id, "lobbyname": lobby_name, "lobbydesc": lobby_desc,
                "gamecode": gamecode, "gamerules": gamerules};
    let payload = JSON.stringify(data);

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/create_lobby", false );
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(payload);
    // let response = xmlHttp.response;
    let response = JSON.parse(xmlHttp.responseText);

    if(xmlHttp.status == 201)
	{
		console.log("Lobby successfully created");
		lobby_id = response.lobby_id;
        console.log("lobby_id is " + lobby_id);
	}
	else 
	{
		console.log("Lobby creation error: " + response);
	}


}

function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function joinLobby(elem)
{
    let lobby_id_text = elem.parentNode.parentNode.childNodes[7].innerHTML;
    let lobby_id = parseInt(lobby_id_text);
    let url = "http://" + location.host + "/lobby/" + lobby_id;
    window.location.href = url;
}

// console.log(httpGet("/lobby_list"));

let lobbies = JSON.parse(httpGet("/lobby_list"));

generateTable(lobbies);

// console.log(lobbies);