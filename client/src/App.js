import React, { Component } from "react";
import { Container } from "shards-react";
import "./App.css";
import Login from "./login/login";
import NavBar from "./components/navbar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Login />
      </Container>
    </div>
  );
}

export default App;
