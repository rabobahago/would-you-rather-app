import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Header from "./Header";
import PageNotFound from "./PageNotFound";
import Login from "./Login";
import Home from "./Home";
import AddQuestion from "./AddQuestion";
import LeaderBoard from "./LeaderBoard";
import Question from "./Question";
import Result from "./Result";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <div>
      <Header />
      <Router>
        <Fragment>
          <div className="container">
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/login/redirect/:id" exact component={Login} />
              <Route path="/home" exact component={Home} />
              <Route path="/questions/:id" exact component={Question} />
              <Route path="/results/:id" exact component={Result} />
              <Route path="/add" exact component={AddQuestion} />
              <Route path="/leaderBoard" exact component={LeaderBoard} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </div>
  );
};

export default App;
