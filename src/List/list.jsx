import React, { Component } from "react";
import ListItem from "../ListItem/listItem";
import './list.css';

class List extends Component {

  constructor() {
    super();

    this.state = {
      results: [],
      filters: {
        showOnlyReviewed: false
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
    this.originalDataStore = this.getAllStudies();
    this.buildReviewedProp();
    this.setState({results: this.originalDataStore})
  }

  getAllStudies = () => {
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

  getReviewedIds = () => {
    // gets ids of all studies that have a review pointed at them
    return this.originalDataStore.map(obj => {
        return obj.isPeerReview ? obj.reviewedStudyId : null;
    })
  }

  getReviewedStudies = () => {
    // builds array of studies that have reviews pointing at them
    const reviewedIds = this.getReviewedIds();

    return this.originalDataStore.filter(obj => {
      return reviewedIds.indexOf(obj.id) > -1 ? obj : null;
    })
  }

  buildReviewedProp = () => {
    // sets `reviewed` property on studies that have review pointing at them
    const reviewedIds = this.getReviewedIds();

    for (let i=0; i<this.originalDataStore.length; i++) {
      const match = reviewedIds.indexOf(this.originalDataStore[i].id) > -1;
      if (match) {
        this.originalDataStore[i].reviewed = true;
      }
    }
  }

  handleFilters = (e) => {
    let state = this.state;

    state.filters.showOnlyReviewed = !state.filters.showOnlyReviewed;

      if (state.filters.showOnlyReviewed) {

        state.results = this.getReviewedStudies();

      } else {state.results = this.originalDataStore}

    this.setState(state);
  }

  render() {
    return (
      <div className="list-container">
        <div className="filters-container">
          <div className={'filter' + (this.state.filters.showOnlyReviewed ? ' filter-on' : '')} onClick={this.handleFilters}>
            {this.state.filters.showOnlyReviewed ? '(ON) ' : null}
            Show only Peer Reviewed Studies
          </div>
        </div>
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
