import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import './App.css';
import logo from './sledger-logo-1.svg';
import List from './List/list';
import PostNew from "./PostNew/postNew";
import ReviewStudy from "./ReviewStudy/reviewStudy";

class App extends Component {
  state = {
    route: 'all'
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
