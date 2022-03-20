import React, { Component } from "react";
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
 
import { 
  socketConnectedSelector,
  socketClientSelector,
  winnersSelector
} from '../store/selectors'

class Winners extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      socketConnected,
      socketClient,
      winners
    } = this.props

    if (socketConnected && winners === null) {
      socketClient.send(JSON.stringify({"Type": "WINNERS"}))
    }
  }

  render() {
    const {
      winners
    } = this.props
    return (
      <Container>
        <Row>
          <Col sm={6}><h5>Wallet</h5></Col>
          <Col sm={6}><h5>Block</h5></Col>
        </Row>
        { 
          winners !== null && winners.Entries.length > 0
          ? winners.Entries.map((entry) => {
              return (
                  <Row key={entry.Hash}>
                    <Col sm={6}>{entry.Address}</Col>
                    <Col sm={6}><a target="_blank" href={"https://www.blockchain.com/btc/block/" + entry.Hash}>{entry.Hash}</a></Col>
                  </Row>
              )
            })
          : <Row>
              <Col sm={12}>Nothing here yet. Will you be the first ever minerlotto winner?</Col>
            </Row>
        }
      </Container>
    );
  }
}



function mapStateToProps(state) {
  return {
    socketConnected: socketConnectedSelector(state),
    socketClient: socketClientSelector(state),
    winners: winnersSelector(state)
  }
}

export default connect(mapStateToProps)(Winners);