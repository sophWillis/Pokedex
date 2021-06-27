import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dropdown from "./components/layouts/Dropdown";
import Dashboard from "./components/layouts/Dashboard";
import Pokemon from "./components/layouts/Pokemon";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Navbar toggleDropdown={toggleDropdown} />
      <Dropdown isOpen={isOpen} />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
      </Switch>
    </Router>
  );
};

export default App;
