import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './App.css';
import logo from './sledger-logo-1.svg';
import List from './List/list';
import PostNew from "./PostNew/postNew";
import ReviewStudy from "./ReviewStudy/reviewStudy";
import ViewStudy from "./ViewStudy/viewStudy";

class App extends Component {
  constructor() {
    super();
    this.state = {
      originalData: []
    }
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

  getAllStudies = () => {
    let result = [];

    for (let i = 0; i < 10; i++) {
      let newObj = Object.assign({}, this.sampleobject);
      newObj.id = i;

      const rand = Math.floor(Math.random() * 100);

      if (rand % 2 === 0) {
        newObj.isPeerReview = true;
        newObj.reviewedStudyId = Math.floor(Math.random() * 10);
      }

      result.push(newObj);
    }
    return result;
  }

  componentWillMount() {
    this.setState({originalData: this.getAllStudies()});
  }

  render() {

    return (
      <div className="page-container">
        <header className="App-header">
          <img className="logo" src={logo} alt="logo"/>
          <div className="nav">
            <Link to="/">All</Link>
            <Link to="/new">New</Link>
            <Link to="/review">Review</Link>
          </div>
        </header>
        <div className="content">
          <Route exact path="/" render={(props) => { return <List allData={this.state.originalData} {...props} /> }}/>
          <Route exact path="/review" render={(props) => { return <List allData={this.state.originalData} {...props} /> }}/>
          <Route path="/new" component={PostNew}/>
          <Route exact path="/review/:id" render={(props) => {return <ReviewStudy data={this.state.originalData[props.match.params.id]}/>}}/>
          <Route 
            path="/view/:id" 
            render={(props) => { return <ViewStudy {...props}/> }}/>
        </div>
      </div>
    );
  }
}

export default App;
