import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import Test1 from './test1'
import './App.css';

class Home extends React.Component {
  state = {
    didGetUserName: true,
    inputText: ""
  }

  constructor(props) {
    super(props);
    this.textArea = React.createRef();
  }

  enterUserName = () => {
    const typedText = this.textArea.current.value
  
    this.setState({
      inputText: typedText
    })
  }

  pushToLobby = () => {
    this.props.history.push('/test1');
  }

  render() { 
    const didGetUserName = this.state.didGetUserName;
    if (didGetUserName){
    }
    return (
        <div id="App">
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
              Sigal.io is a site where you can create and join and create lobbies with your favorite board games. More description here.
              Once you enter a nickname and click submit, you can either
              look for a lobby that someone has created through a game ID or create your own lobby. To set up a lobby, you will need to upload game code and also enter a description.  
            </p>
            <h1 id="inputDescription">Insert Nickname</h1>
            <input 
                  id="inputText" 
                  ref = {this.textArea}
                  onInput={this.enterUserName}></input>
            <button 
                  id="submit"//this.pushToLobby 
                  onClick= {() =>{
                    this.props.setUserName(this.state.inputText)
                    console.log(this.state.inputText)
                    this.pushToLobby()
                  }}
            >Submit</button>
          </body>
        </div>
    )
  }
}

export default withRouter(Home);