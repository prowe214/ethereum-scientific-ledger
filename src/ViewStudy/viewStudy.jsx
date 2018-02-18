import React, { Component } from 'react';

class ViewStudy extends Component {

  state = {
    id: this.props.match.params.id
  }

  render() {
    return (
      <div>{this.state.id}</div>
    )
  }
}

export default ViewStudy;