import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './App.css';
import logo from './sledger-logo-1.svg';
import List from './List/list';
import PostNew from "./PostNew/postNew";
import ReviewStudy from "./ReviewStudy/reviewStudy";
import ViewStudy from "./ViewStudy/viewStudy";
import mockStudies from './Helpers/data.json';
import getWeb3 from './utils/getWeb3';
import PublicationFactory from './build/contracts/PublicationFactory.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      originalData: [],
    storageValue: 0,
    web3: null,
    route: 'all',
    publicationFactory: null
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
  studiesData = mockStudies;

  getAllStudies = () => {
    let result = [];

    for (let i = 0; i < this.studiesData.length; i++) {
      const rand = Math.floor(Math.random() * 100);

      if (rand % 2 === 0) {
        this.studiesData[i].isPeerReview = true;
        this.studiesData[i].reviewedStudyId = Math.floor(Math.random() * 10);
      }

      result.push(this.studiesData[i]);
    }
    return result;
  }

componentWillMount() {
    this.setState({originalData: this.getAllStudies()});

    getWeb3.then(results => {
        this.setState({web3: results.web3})

        // Instantiate contract once web3 provided.
        this.instantiateContract()
    }).catch(() => {
        console.log('Error finding web3.')
    })
}


instantiateContract() {
    const contract = require('truffle-contract')
    const publicationFactory = contract(PublicationFactory)
    this.state.publicationFactory = publicationFactory

    publicationFactory.setProvider(this.state.web3.currentProvider)

    var publicationFactoryInstance

    this.state.web3.eth.getAccounts((error, accounts) => {
        if (error) {
            console.log('Error Occurred', error)
        }

        publicationFactory.deployed().then((instance) => {
            publicationFactoryInstance = instance
            console.log("HERE>>>>>>>>>>>>>>>>>", instance)
            // Stores a given value, 5 by default.
            // return publicationFactoryInstance.set(5, {from: accounts[0]})
        }).then((result) => {
            // Get the value from the contract to prove it worked.
            return publicationFactoryInstance.getPublicationPeerReviewed.call(accounts[0])
        }).then((result) => {
            // Update state with the result.
            console.log("Result from getPublicationPeerReviewed:", result)
            return this.setState({storageValue: result.c[0]})
        }).catch(oops => console.log(oops))
    })
    this.bindEvents()
}

bindEvents() {
    //click listener to set off creation
    this.createPublication()
}

createPublication() {
    var publicationInstance
    this.state.publicationFactory.deployed().then()
    // console.log("do nothing"))
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
