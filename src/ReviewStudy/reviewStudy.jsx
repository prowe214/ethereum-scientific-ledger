import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import Moment from "moment";
import '../ListItem/listItem.css';

class ReviewStudy extends Component {
  // NEEDS
  // - Autopopulate with some info (title, id)
  // - Button from original article
  constructor() {
    super();
    this.state = {
      form: {
        title: '',
        summary: '',
        criticisms: '',
        validatesStudy: false
      }
    }
  }

  componentDidMount() {
    let state = this.state;
    state.form.title = this.props.data.title;
    this.setState(state);
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
    console.log('SUBMITTED!', this.state.form);
  }

  render(){
    const date = Moment(this.props.data.publishDate).format('MMMM Do, YYYY').toString();

    return(
      <div className="review-study">
        <h2>Submit a Peer Review</h2>
        <p>Add your peer review to verify the merit of this study.</p>

        <div className="panel">
          <h3>{this.props.data.title}</h3>
          <div>Published on {date}</div>
          <div className="abstract">
            <div className="section-name">Original Abstract</div>
            <div>{this.props.data.abstract}</div>
          </div>
          <div className="review-form">
            <div className="section-name">Your Review</div>
            <label htmlFor="summary">Summary
              <textarea name="summary" onChange={this.handleChange}/>
            </label>
            <label htmlFor="criticisms">Criticisms
              <textarea name="criticisms" onChange={this.handleChange}/>
            </label>
            <div className="label">Given your criticisms, do you believe that this study is validated?</div>
              <div className="radio-input">
                <input className="inline-block" name="validatesStudy" type="radio" onChange={this.handleChange} id="isPeerReviewFalse"/>
                <label className="inline-block" htmlFor="validatesStudy">No, this study is not sufficient to consider its conclusions valid</label>
              </div>
              <div className="radio-input">
                <input className="inline-block" name="validatesStudy" type="radio" onChange={this.handleChange} id="isPeerReviewTrue"/>
                <label className="inline-block" htmlFor="validatesStudy">Yes, the conclusions of this study are valid</label>
              </div>
            </div>
          <div className="btn submit" onClick={this.handleSubmit}>Submit</div>
        </div>
      </div>
    )
  }
}

export default ReviewStudy;
