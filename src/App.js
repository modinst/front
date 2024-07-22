import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupRecordsPage from "./pages/GroupRecordsPage";
import RecordDetailsPage from "./pages/RecordDetailsPage";

function App() {
  return (
    <Router>
      <div className="flex">
        <MainPage />
        <div className="ml-64 flex-grow p-4">
          <Switch>
            <Route path="/group/:groupId" component={GroupRecordsPage} />
            <Route path="/record/:recordId" component={RecordDetailsPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
