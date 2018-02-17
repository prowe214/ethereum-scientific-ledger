import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from "./ListItem/listItem";

class App extends Component {

  testobject = {
    title: "test title",
    abstract: "lots of words for an abstract",
    introduction: "here is an intro",
    methods: "methods are presented here",
    results: "results are here",
    discussion: "some discussion",
    acknowledgements: "acknowledgements talking about people",
    citations: "citations of people"
  }

  render() {
    console.log(this.testobject);
    
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container">
          <p className="App-intro">
            <ListItem data={this.testobject} expanded="true"></ListItem>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
