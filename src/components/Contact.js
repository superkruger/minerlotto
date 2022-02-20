import React, { Component } from "react";
import { Follow } from 'react-twitter-widgets';

class Contact extends Component {
  render() {
    return (
      <div>
        <h2>Got Questions or Feedback?</h2>

        <Follow username="toxicus_maximus" />
      </div>
    );
  }
}
 
export default Contact;