function loadLobbies() 
{
    // query list for lobbies from backend
    lobbies_list = [0,1,2];
    for(let i = 0; i < lobbies_list; i++)
    {
        // Generate HTML for lobbies_list[i]
    }
}

function loadLobbyDetails(lobby)
{
    let table_row = document.createElement("tr");
    let table_data1 = document.createElement("td");
    let table_data2 = document.createElement("td");
    let table_data3 = document.createElement("td");
    table_data1.innerHTML = lobby.name;
    table_data2.innerHTML = lobby.id;
    table_data3.innerHTML = "";

}

//For now I'm just testing and implementing hard coded data before postgresql

let lobbies = [
    {name: "Yessir", id: 12323},
    {name: "You already know", id: 45},
    {name: "Lesssgeit", id: 66547},
    {name: "SCHAMONE", id: 12}
];

function generateTableHead(table)
{
    let thead = table.createTHead();
    let row = thead.insertRow();
    for(let key of data)
    {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data)
{
    for(let element of data)
    {
        let row = table.insertRow();
        for(key in element)
        {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

let table = document.querySelector("table");
let data = Object.keys(lobbies[0]);
generateTableHead(table, data);
generateTable(table, lobbies);
