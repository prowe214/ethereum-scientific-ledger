import React, { Component } from 'react';
import './listItem.css';
import * as helpers from '../Helpers/helpers';
import Moment from "moment";

class ListItem extends Component {
  state = {
    expanded: this.props.expanded
  }
      // study: {
      //   title
      //   abstract
      //   introduction
      //   methods
      //   results
      //   discussion
      //   acknowledgements
      //   citations
      //   author
      //   date
      //   isPeerReview
      //   reviewedStudyId    <- for peer reviews only, null otherwise
      // },
      // expanded: this.props.expanded

  handleExpandoToggle = () => {
    // this.state.expanded = !this.state.expanded;
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const date = Moment(this.props.data.publishDate).format('MMMM Do, YYYY').toString();
    const expand = <i className="fal fa-plus"></i>
    const collapse = <i className="fal fa-times"></i>


    return(
      <div className="list-item">
        {expand} {collapse}
        <div className="panel study-title">
          <div className="title-name">
            <span className="peer-review-indicator"> {this.props.data.isPeerReview ? 'Peer Review of: ' : ''}</span>
            <span className="title">{helpers.toTitleCase(this.props.data.title)}</span>
          </div>
          <div>
            <div className="inline-block">
              <div className="stacked">
                <span className="study-date">Published on {date}</span>
                <span className="requires-review">{this.props.data.reviewed ? null : 'Requires Review'}</span>
              </div>
            </div>
            <div className="inline-block">
              <span className="expand-button" onClick={this.handleExpandoToggle}>{this.state.expanded ? '-' : '+'}</span>
            </div>
          </div>
        </div>
        <div className={"details" + (this.state.expanded ? ' expanded' : '')}>
          <div className="panel study-author">
            <span className="section-name">Author</span>
            {this.props.data.author}
          </div>
          <div className="panel study-abstract">
            <span className="section-name">Abstract</span>
            {this.props.data.abstract}
          </div>
          <div className="panel study-introduction">
            <span className="section-name">Introduction</span>
            {this.props.data.introduction}
          </div>
          <div className="panel study-methods">
            <span className="section-name">Methods</span>
            {this.props.data.methods}
          </div>
          <div className="panel study-results">
            <span className="section-name">Results</span>
            {this.props.data.results}
          </div>
          <div className="panel study-discussion">
            <span className="section-name">Discussion</span>
            {this.props.data.discussion}
          </div>
          <div className="panel study-acknowledgements">
            <span className="section-name">Acknowledgements</span>
            {this.props.data.acknowledgements}
          </div>
          <div className="panel study-citations">
            <span className="section-name">Citations</span>
            {this.props.data.citations}
          </div>
        </div>
      </div>
    )
  }
}

export default ListItem; // Don’t forget to use export default!
