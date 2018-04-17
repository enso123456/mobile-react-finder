import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, browserHistory, IndexRoute } from "react-router";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

import { AUTH_USER } from "./actions/types";

import App from "./components/app";
import Signin from "./components/auth/signin";
import Signout from "./components/auth/signout";
import Signup from "./components/auth/signup";
import RequireAuth from "./components/auth/require_authentication";
import Welcome from "./components/welcome";
import PublicAuth from "./components/auth/public_authentication";
import Search from "./components/search/search";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem("token");

if (token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={PublicAuth(Signin)} />
        <Route path="signin" component={PublicAuth(Signin)} />
        <Route path="signout" component={RequireAuth(Signout)} />
        <Route path="signup" component={PublicAuth(Signup)} />
        <Route path="search" component={RequireAuth(Search)} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector(".container")
);
