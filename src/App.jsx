import React, { Component } from 'react';
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
    citations: "citations of people",
    publishDate: Date.now(),
    id: 0,
    reviewedStudyId: null,
    isPeerReview: false,
    author: "Jerry von Scientism"
  }

  studies = () => {
    let result = [];
    for (let i = 0; i < 10; i++) {
      this.testobject.id = i;
      result.push(this.testobject);
    }
    return result;
  }

  render() {
    console.log(this.testobject);

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The Journal</h1>
        </header>
        <div className="container">
          {this.studies().map(article => 
            <ListItem data={article} expanded={false} key={article.id}></ListItem>
          )}
        </div>
      </div>
    );
  }
}

export default App;
