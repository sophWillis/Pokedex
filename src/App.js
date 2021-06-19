import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/layouts/Dashboard";
import Pokemon from "./components/layouts/Pokemon";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
      </Switch>
    </Router>
  );
};

export default App;
