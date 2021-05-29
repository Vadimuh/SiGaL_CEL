import React from 'react';

import './style.css';

class JoinLobby extends React.Component {
    state = {
        didGetUserName: false,
        inputText: ""
    }

    constructor(props) {
        super(props);
        this.state = { didGetUserName : true};
        // This is temporary to get the render to work

        this.textArea = React.createRef;
    }

    getUserName = () => {
        const userNameText = this.textArea.current.value;

        this.setState({
            inputText: userNameText
        })
    }

    moveToLobby = () => {
        this.props.history.push('/Lobby')
    }

    render () {
        const didGetUserName = this.state.didGetUserName;
        if (didGetUserName) {

        }
        return (
        
        // Still formatting left to be done
        <div>
            <head>
                <title>SiGaL Index</title>
            </head>
            <body>
                <div id="banner">
                    <h1>
                        Sigal.io
                    </h1>
                </div>
                <p id="description">
                    Sigal.io is a site where you can create and join and create lobbies with your favorite board games.
                    More description here

                    Once you enter a nickname and click submit, you can either look for a lobbie that someone has create through a game id or create your own lobby. 
                    To set up a lobby, you will need to upload game code and also enter a description.
                </p>
                <h1 id="inputDescription">Insert Nickname</h1>
                <input 
                    id="inputText"
                    ref = {this.textArea}
                    onInput={this.getUserName}></input>
                <button 
                    id="submitButton"
                    onClick = {() => {
                        this.props.setUserName(this.state.inputText)
                        console.log(this.state.inputText)
                        // Testing if username is received
                        this.moveToLobby()
                    }}>Submit</button> 
            </body>
        </div>
        )
    }
}