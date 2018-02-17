import React, { Component } from 'react';
import './App.css';
import ListItem from "./ListItem/listItem";

class App extends Component {
  state = {
    route: 'all'
  }

  sampleobject = {
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
      let newObj = Object.assign({}, this.sampleobject);
      newObj.id = i;

      if (i % 3 === 0) {
        newObj.isPeerReview = true;
        newObj.reviewedStudyId = 4;
      }

      result.push(newObj);
    }
    return result;
  }

  render() {
    let view = null;
    const setView = (route) => {
      if (route) {
        this.setState({route: route});
      } else {
        this.setState({route: 'all'});
      }

      if (this.state.route === 'all') {
        view = ( 
          this.studies().map(study => 
            <ListItem data={study} expanded={false} key={study.id}></ListItem>
          )
        )
      } else if (this.state.route === 'post new') {
        view = (<div>Hi!</div>)
      }
    }
    const routeNew = () => {
      setView('post new');
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">SLEDGER</h1>
          <div className="nav">
            <a onClick={routeNew}>Post New Study</a>
          </div>
        </header>
        <div className="container">
          {view}
        </div>
      </div>
    );
  }
}

export default App;
