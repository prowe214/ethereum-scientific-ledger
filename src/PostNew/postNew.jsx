import React, { Component } from "react";
import Moment from "moment";

class PostNew extends Component {

  constructor() {
    super();
    this.state = {
      form: {
        title: '',
        abstract: '',
        introduction: '',
        methods: '',
        results: '',
        discussion: '',
        acknowledgements: '',
        citations: '',
        author: '',
        date: Date.now().toString(),
        isPeerReview: false,
        reviewedStudyId: null
      }
    }
  }

  handleChange = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSubmit = () => {
    console.log('SUBMITTED', this.state.form);
  }

  render(){
    const fields = Object.keys(this.state.form);
    const form = () => {
      {for (let i=0; i<fields.length; i++) {
        <label htmlFor={fields}>
          <input name="title" value={this.state.form.title} type="text" onBlur={this.handleChange} id="title"/>
        </label>
      }}
    }

    return(
      <div className="form new-study">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            <input name="title" value={this.state.form.title} type="text" onBlur={this.handleChange} id="title"/>
          </label>
        </form>
      </div>
    )
  }
}

export default PostNew;
