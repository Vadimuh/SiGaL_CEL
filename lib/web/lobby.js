import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default function initialDashboard() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Game</Link>
                    </li>
                    <li>
                        <Link to="/">Search</Link>
                    </li>
                </ul>

                <Switch>
                    <Route exact path="/">
                        <Game />
                    </Route>
                    <Route path="/Search">
                        <Search />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

// TODO: Get the lobby creation screen running
// Either multiple .js files or lots of functions in one js

function Game() {
    return (
        <div>
            <button onclick="makeGameLobby()">
                Make Lobby
            </button>
        </div>
    );
}
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
