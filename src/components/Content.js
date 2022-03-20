import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Routes,
  Route,
} from "react-router-dom";
import { Tabs, Tab } from 'react-bootstrap'
import Home from "./Home";
import Faq from "./Faq";
import Contact from "./Contact";
import Winners from "./Winners";

class Content extends Component {

  render() {
    return (
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/faq" element={<Faq/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/winners" element={<Winners/>}/>
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
