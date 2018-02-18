import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './App.css';
import logo from './sledger-logo-1.svg';
import List from './List/list';
import PostNew from "./PostNew/postNew";
import ReviewStudy from "./ReviewStudy/reviewStudy";
import getWeb3 from './utils/getWeb3';
import PublicationFactory from '../build/contracts/PublicationFactory.json';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
              storageValue: 0,
              web3: null,
              route: 'all'
            }
    }
    componentWillMount() {
      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.

      getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }

    instantiateContract() {
      /*
       * SMART CONTRACT EXAMPLE
       *
       * Normally these functions would be called in the context of a
       * state management library, but for convenience I've placed them here.
       */

      const contract = require('truffle-contract')
      const publicationFactory = contract(PublicationFactory)
      publicationFactory.setProvider(this.state.web3.currentProvider)

      // Declaring this for later so we can chain functions on SimpleStorage.
      var publicationFactoryInstance

      // Get accounts.
      this.state.web3.eth.getAccounts((error, accounts) => {
        if (error) {
            console.log('Error Occurred', error)
        }

        publicationFactory.deployed().then((instance) => {
          console.log('Instance', instance)
          publicationFactoryInstance = instance

          // Stores a given value, 5 by default.
          return publicationFactoryInstance.set(5, {from: accounts[0]})
        }).then((result) => {
            console.log('Result1', result)
          // Get the value from the contract to prove it worked.
          return publicationFactoryInstance.getPublicationPeerReviewed.call(accounts[0])
        }).then((result) => {
          // Update state with the result.
          console.log('Result2', result)
          return this.setState({ storageValue: result.c[0] })
        })
    })
    }



  render() {
    // let view = null;
    // const setView = (route) => {
    //   if (route) {
    //     this.setState({route: route});
    //   } else {
    //     this.setState({route: 'all'});
    //   }

    //   if (this.state.route === 'all') {
    //     view = (
    //       this.studies().map(study =>
    //         <ListItem data={study} expanded={false} key={study.id}></ListItem>
    //       )
    //     )
    //   } else if (this.state.route === 'post new') {
    //     view = (<div>Hi!</div>)
    //   }
    // }

    return (
      <div>
        <header className="App-header">
          <img className="logo" src={logo} alt="logo"/>
          <div className="nav">
            <Link to="/">All</Link>
            <Link to="/new">New</Link>
            <Link to="/review">Review</Link>
          </div>
        </header>
        <div className="content">
          <Route exact path="/" component={List}/>
          <Route path="/new" component={PostNew}/>
          <Route path="/review" component={ReviewStudy}/>
        </div>
      </div>
    );
  }
}

export default App;
