import React, { Component } from "react";
import ListItem from "../ListItem/listItem";

class List extends Component {

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
    return (
      <div className="list">
        {this.studies().map(study => 
          <ListItem data={study} expanded={false} key={study.id}></ListItem>
        )}
      </div>
    )
  }
}

export default List;
