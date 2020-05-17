import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import './App.css';
import LoginPage from "./LoginPage.js"
import ChatBox from "./ChatBox.js"

function App() {

  return (
    /*
    <div className="App">
      <ChatBox />
    </div>
    */

    <div className="App">
      <Router>
        <Switch>

          <Route path="/LoginPage">
            <LoginPage />
          </Route>

          <Route path="/">
            <Link  to="/LoginPage">Login</Link>
          </Route>

          <Route path="/ChatBox"> 
              <ChatBox />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
