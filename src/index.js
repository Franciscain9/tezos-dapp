import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import SigninPage from "./views/SigninPage/SigninPage.js";
import LandingPage from "./views/LandingPage/LandingPage.js";
import ProfilePage from "./views/ProfilePage/ProfilePage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import MoreInf from "./views/MoreInf/MoreInf.js";
import CreateVotePage from "./views/CreateVotePage/CreateVotePage.js";
import VotePage from "views/VotePage/VotePage.js";
import ResultPage from "views/ResultPage/ResultPage.js";


import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/informations/vote" component={MoreInf} />
      <Route path="/devis" component={ProfilePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signin" component={SigninPage} />
      <Route path="/new-vote" component={CreateVotePage} />
      <Route path="/vote/:token" component={VotePage} />
      <Route path="/resultat/:token" component={ResultPage} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);