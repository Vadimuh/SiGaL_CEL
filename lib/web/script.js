let nickname;
let user_id = undefined;
function submitName(){
	nickname = document.getElementById("nickname").value;
	registerNickname(nickname);
	//maybe some requirement for name

	
	
	// let welcome = document.getElementById("nameBox");
	// welcome = welcome.concat(nickname);

	//redirect to lobbies
}

function registerNickname(nickname)
{
	let data = {"nickname": nickname};
	let payload = JSON.stringify(data);

	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "/register", false);
	xmlHttp.setRequestHeader("Content-Type", "application/json");
	xmlHttp.send(payload);
	let response = xmlHttp.response;

	if(xmlHttp.status == 201)
	{
		console.log("nickname successfully registered");
		user_id = xmlHttp.response.user_id;
	}
	else 
	{
		console.log("nickname registeration error: " + response);
	}
	
}
