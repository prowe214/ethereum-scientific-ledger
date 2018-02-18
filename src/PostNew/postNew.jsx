import React, { Component } from "react";
import Moment from "moment";
import './postNew.css';

class PostNew extends Component {

  constructor(props) {
    super(props);



    this.state = {
      form: {
        title: 'hello',
        abstract: '',
        introduction: '',
        methods: '',
        results: '',
        discussion: '',
        acknowledgements: '',
        citations: '',
        author: '',
        date: Date.now(),
        isPeerReview: false,
        reviewedStudyId: false
      }
    }

    console.log('Props', props);
  }

  handleChange = (e) => {
    const state = this.state;
    if (e.target.type === 'radio') {
      state.form[e.target.name] = e.target.checked;
    } else {
      state.form[e.target.name] = e.target.value;
    }
    this.setState(state);
  }


  handleSubmit = () => {
    console.log('SUBMITTED', this.state.form);
  }

  render(){

    return(
      <div className="new-study">
        <h2>Submit a New Study</h2>
        <p>This study will be open to Peer Review.  Once reviewed and approved, it will be posted permanently to Sledger.</p>
        <div className="form">
          <label htmlFor="title">Title
            <input name="title" value={this.state.form.title} type="text" onChange={this.handleChange} id="title"/>
          </label>
          <label htmlFor="abstract">Abstract
            <textarea name="abstract" value={this.state.form.abstract} type="text" onChange={this.handleChange} id="abstract"/>
          </label>
          <label htmlFor="Introduction">Introduction
            <textarea name="introduction" value={this.state.form.introduction} type="text" onChange={this.handleChange} id="introduction"/>
          </label>
          <label htmlFor="methods">Methods
            <textarea name="methods" value={this.state.form.methods} type="text" onChange={this.handleChange} id="methods"/>
          </label>
          <label htmlFor="results">Results
            <textarea name="results" value={this.state.form.results} type="text" onChange={this.handleChange} id="results"/>
          </label>
          <label htmlFor="discussion">Discussion
            <textarea name="discussion" value={this.state.form.discussion} type="text" onChange={this.handleChange} id="discussion"/>
          </label>
          <label htmlFor="acknowledgements">Acknowledgements
            <textarea name="acknowledgements" value={this.state.form.acknowledgements} type="text" onChange={this.handleChange} id="acknowledgements"/>
          </label>
          <label htmlFor="citations">Citations
            <textarea name="citations" value={this.state.form.citations} type="text" onChange={this.handleChange} id="citations"/>
          </label>
          <label htmlFor="author">Author
            <input name="author" value={this.state.form.author} type="text" onChange={this.handleChange} id="author"/>
          </label>
          <label htmlFor="date">Publish Date
            <input name="date" value={Moment(this.state.form.date).format('YYYY-MM-DD')} type="date" onChange={this.handleChange} id="date"/>
          </label>
          <div className="label">Is this a Peer Review?</div>
            <div className="radio-input">
              <input className="inline-block" name="isPeerReview" checked={this.state.form.isPeerReview === false} type="radio" onChange={this.handleChange} id="isPeerReviewFalse"/>
              <label className="inline-block" htmlFor="isPeerReview">No, this is a new study</label>
            </div>
            <div className="radio-input">
              <input className="inline-block" name="isPeerReview" checked={this.state.form.isPeerReview === true} type="radio" onChange={this.handleChange} id="isPeerReviewTrue"/>
              <label className="inline-block" htmlFor="isPeerReview">Yes, this is a peer review of an existing study</label>
            </div>
          <label htmlFor="reviewedStudyId" className={this.state.form.isPeerReview ? '' : 'hidden'}>What is the ID of the study are you reviewing?
            <input name="reviewedStudyId" value={this.state.form.reviewedStudyId} type="number" onChange={this.handleChange} id="reviewedStudyId"/>
          </label>
          <button className="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export default PostNew;
