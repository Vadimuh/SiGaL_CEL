import React, {useState} from "react";
import JoinLobby from './joinlobby';
import Lobby from './lobbies';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { UserContext } from "./UserContext";

function Routing() {
    const [userName, setUsername] = useState('')
    const [userID, setUserID] = useState('')

    return (
        <Router>
            <div>
            <UserContext.Provider value={{userName, setUserName}}>
                <Switch>
                    <Route exact path="/">
                        <JoinLobby setUserName = {setUserName}/>
                    </Route>
                    <Route path="/Lobby"/>
                        <Lobby userName = {userName}/>
                </Switch>
            </UserContext.Provider>
            </div>
        </Router>
    )
}

export default Routing;


// TODO: Implement search bar and functionality
// Need to attach to lobby ID 
function Search() {
    return (
        <div>
            <button onClick>
                Search Bar
            </button>
        </div>
    );
}
