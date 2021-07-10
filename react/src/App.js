import React, { useState } from 'react';
import Test1 from './test1';
import Lobby from './lobby';
import Home from './Home';
import {UserContext} from './UserContext'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';

function App () {
  const [userName, setUserName] = useState('')

  return (
      <Router>
        <div>
        <UserContext.Provider value={{userName, setUserName}}>
          <Switch>
            <Route exact path="/">
              <Home setUserName = {setUserName}/>
            </Route>
            <Route path="/Test1">
              <Test1 userName = {userName}/>
            </Route>
            <Route path="/Lobby">
              <Lobby userName = {userName}/>
            </Route>
          </Switch>
          </UserContext.Provider>
        </div>
      </Router>

  );
}

export default App;
