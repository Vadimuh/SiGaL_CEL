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
        rowData[0].innerHTML = lobbyData.lobbyname;
        rowData[1].innerHTML = lobbyData.lobbydesc;
        rowData[2].innerHTML = lobbyData.id;
        tableNode.appendChild(cloneRow);
    }
}

function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

// console.log(httpGet("/lobby_list"));

let lobbies = JSON.parse(httpGet("/lobby_list"));

generateTable(lobbies);

// console.log(lobbies);