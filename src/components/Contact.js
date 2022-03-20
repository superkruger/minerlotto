import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap'
import { Timeline } from 'react-twitter-widgets';

class Contact extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <h4>Got Questions or Feedback?</h4>

            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'miner_lotto'
              }}
              options={{
              }}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
 
export default Contact;