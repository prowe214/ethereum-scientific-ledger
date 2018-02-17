import React, { Component } from 'react';
import './listItem.css';
import * as helpers from '../Helpers/helpers';

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
    const current = this.state.expanded;
    this.setState({expanded: !current});
  }

  render() {
    return(
      <div className="list-item">
        <div className="panel study-title">{helpers.toTitleCase(this.props.data.title)}</div>
        <div className="expander" onClick={this.handleExpandoToggle}><span>{this.state.expanded ? '-' : '+'}</span></div>
        <div className={"details" + (this.state.expanded ? ' expanded' : '')}>
          <div className="panel study-author">
            <span className="section-name">Author</span>
            {this.props.data.author}
          </div>
          <div className="panel study-date">
            <span className="section-name">Published</span>
            {this.props.data.publishDate}
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
