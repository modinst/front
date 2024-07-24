// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={MainPage} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
