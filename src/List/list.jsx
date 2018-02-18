import React, { Component } from "react";
import ListItem from "../ListItem/listItem";
import './list.css';

class List extends Component {

  constructor() {
    super();

    this.state = {
      results: [],
      filters: {
        showOnlyReviewed: false,
        showOnlyUnreviewed: false
      }
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

  componentDidMount() {
    let state = this.state;
    this.originalDataStore = this.getAllStudies();
    this.buildReviewedProp();
    if (this.props.location.pathname === '/review') {
      state.filters.showOnlyUnreviewed = true;
    }
    state.results = this.originalDataStore;
    this.handleFilters();
    this.setState(state)
  }

  getAllStudies = () => {
    return this.props.allData;
    // let result = [];

    // for (let i = 0; i < 10; i++) {
    //   let newObj = Object.assign({}, this.sampleobject);
    //   newObj.id = i;

    //   const rand = Math.floor(Math.random() * 100);

    //   if (rand % 2 === 0) {
    //     newObj.isPeerReview = true;
    //     newObj.reviewedStudyId = Math.floor(Math.random() * 10);
    //   }

    //   result.push(newObj);
    // }
    // return result;
  }

  getReviewIds = () => {
    // gets ids of all studies that have a review pointed at them
    return this.originalDataStore.map(obj => {
        return obj.isPeerReview ? obj.reviewedStudyId : null;
    })
  }

  getReviewedStudies = (getUnreviewed) => {
    // builds array of studies that have reviews pointing at them
    const reviewedIds = this.getReviewIds();
    let unreviewedStudies = [];

    for (let i = 0; i < this.originalDataStore.length; i++) {
      if (reviewedIds.indexOf(i) === -1 
            && !this.originalDataStore[i].isPeerReview) {
        unreviewedStudies.push(this.originalDataStore[i]);
      }
    }
    console.log(unreviewedStudies)
    if (getUnreviewed) {
      return unreviewedStudies;
    }

    return this.originalDataStore.filter(obj => {
      return reviewedIds.indexOf(obj.id) > -1 ? obj : null;
    })
  }

  buildReviewedProp = () => {
    // sets `reviewed` property on studies that have review pointing at them
    const reviewedIds = this.getReviewIds();

    for (let i=0; i<this.originalDataStore.length; i++) {
      const match = reviewedIds.indexOf(this.originalDataStore[i].id) > -1;
      if (match) {
        this.originalDataStore[i].reviewed = true;
      }
    }
  }

  handleFilters = (e) => {
    let state = this.state;

    if (e && e.target.id === 'showOnlyReviewed') {
      state.filters.showOnlyReviewed = !state.filters.showOnlyReviewed;
    }

    console.log(state.filters)

    if (state.filters.showOnlyUnreviewed) {
      // inverts getReviewedStudies function
      state.results = this.getReviewedStudies(true);
      console.log(state.results)
    } else if (state.filters.showOnlyReviewed) {

      state.results = this.getReviewedStudies();

    } else {state.results = this.originalDataStore}

    this.setState(state);
  }

  render() {
    let filterButton = null;
    let routeText = null;
    if (!this.state.filters.showOnlyUnreviewed) {
      filterButton = (
          <div className={'filter btn' + (this.state.filters.showOnlyReviewed ? ' filter-on' : '')} id="showOnlyReviewed" onClick={this.handleFilters}>
            Show only Peer Reviewed Studies
          </div>
      )
    }
    if (this.state.filters.showOnlyUnreviewed) {
      routeText = "Displaying studies that require peer review"
    } else if (this.state.filters.showOnlyReviewed) {
      routeText = "Displaying studies that have been peer reviewed"
    } else {
      routeText = "Displaying all studies"
    }



    return (
      <div className="list-container">
        <div className="filters-container">
        {filterButton}
        </div>
        <div>{routeText}</div>
        <div className="list">
          {this.state.results.map(study => 
            <ListItem data={study} expanded={false} key={study.id}></ListItem>
          )}
        </div>
      </div>
    )
  }
}

export default List;
