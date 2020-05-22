import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

import './App.css';
import LoginPage from "./LoginPage.js"
import ChatBox from "./ChatBox.js"

function App() {

  return (
  <Router>
    <div className="App">
      <Switch>
        /* exact specifies rendering to exactly '/' */
        <Route path="/" exact > 
          <Link to="/LoginPage">Login</Link>
        </Route>

        <Route path="/LoginPage" component={LoginPage}/>

        <Route path="/ChatBox" component={ChatBox}/>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
