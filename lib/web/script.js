function submitName(){
	window.nickname = document.getElementById("nickname").value;
	registerNickname(nickname);
	//maybe some requirement for name

	// redirect to lobbies
	let url = "http://" + location.host + "/lobbies";
    window.location.href = url;

	
	// let welcome = document.getElementById("nameBox");
	// welcome = welcome.concat(nickname);

}

function registerNickname(nickname)
{
	let data = {"nickname": nickname};
	let payload = JSON.stringify(data);

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/register", false);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.send(payload);
	// let response = xmlHttp.response;
	let response = JSON.parse(xmlHttp.responseText);

	if(xmlHttp.status == 201)
	{
		console.log("nickname successfully registered");
		window.user_id = response.user_id;
	}
	else 
	{
		console.log("nickname registeration error: " + response);
	}
	
}
