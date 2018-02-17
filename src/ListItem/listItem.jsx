import React, { Component } from 'react';

class ListItem extends Component {
  constructor() {
    super();
    this.state = {
      // study: {
      //   title: this.props.title,
      //   abstract: this.props.abstract,
      //   introduction: this.props.introduction,
      //   methods: this.props.methods,
      //   results: this.props.results,
      //   discussion: this.props.discussion,
      //   acknowledgements: this.props.acknowledgements,
      //   citations: this.props.citations
      // },
      expanded: this.props.expanded
    }
  }

  handleExpandoToggle = () => {
    this.state.expanded = !this.state.expanded;
  }

  render() {
    return(
      <div className="list-item">
        <div className="panel study-title">
          <h3>{this.props.title}</h3>
        </div>
      </div>
    )
  }
}

export default ListItem; // Don’t forget to use export default!
