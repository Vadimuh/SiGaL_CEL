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
    table_data3.innerHTML = ""

}