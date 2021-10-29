import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.scss";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./utils/AuthRoute";

import NavBar from "./components/NavBar";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import SinglePost from "./views/SinglePost";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <NavBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
