import React from 'react';
import {createRandomLobby, joinLobby} from './p_lobbylist'

//TODO: Import p_lobby.js functions without errors
function Lobby() {
    return(
        <div>
            <title>
                SiGaL Lobby
            </title>
            <div id="nameBox">
                <h1>
                    Welcome
                </h1>
                <button onClick={createRandomLobby()}>Create Random Lobby</button>
            </div>
            <div>
                <template id="temp">
                    <tr id="rowTemplate">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><button onClick={joinLobby(this)}>Join Now</button></td>
                    </tr>
                </template>
            </div>
            <div>
                <table id="lobbiesTable">
                    <tr>
                        <th>Host</th>
                        <th>Lobby Name</th>
                        <th>Lobby Description</th>
                        <th>Lobby ID</th>
                        <th></th>
                    </tr>
                </table>
            </div>
        </div>         
    )
}
