import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Routes,
  Route,
} from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap'
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

class Content extends Component {

  render() {
    return (
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Content)
