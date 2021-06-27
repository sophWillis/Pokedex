import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dropdown from "./components/layouts/Dropdown";
import Dashboard from "./components/layouts/Dashboard";
import Pokemon from "./components/layouts/Pokemon";
import Favourites from "./components/layouts/Favourites";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <AuthProvider>
        <Navbar toggleDropdown={toggleDropdown} />
        <Dropdown isOpen={isOpen} />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
          <Route exact path="/favourites" component={Favourites} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
