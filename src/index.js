import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Articles from './Articles'
import Alertes from './Alertes'
import Retours from './Retours'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Link, NavLink, Switch } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <div className="container">
      <Link exact to="/">Home</Link>
      <NavLink exact activeClassName="active" to="/articles">Articles</NavLink>
      <NavLink exact activeClassName="active" to="/alertes">Alertes</NavLink>
      <NavLink exact activeClassName="active" to="/retours">Retours</NavLink>

      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/articles" component={Articles}/>
        <Route exact path="/alertes" component={Alertes}/>
        <Route exact path="/retours" component={Retours}/>
      </Switch>
    </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
