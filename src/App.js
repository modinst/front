// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
