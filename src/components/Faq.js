import React, { Component } from "react";
import { Container, Row, Col } from 'react-bootstrap'
 
class Faq extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={12}>
            <h4>What is MinerLotto?</h4>
            <p>Minerlotto is an experimental delegated Bitcoin Miner that pays out the block reward winnings (minus 1% commission) to one lucky player, potentially every 10 minutes.</p>
            <p>Zero barriers to entry, no KYC, nothing recorded except your wallet address, which is needed to prepare the block</p>
            <p>The block reward is currently 6.25 BTC (plus any included transaction fees)</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>What do I need to play?</h4>
            <p>A Bitcoin wallet address.</p>
            <p>An address is the public identifier of a Bitcoin wallet. You can have as many as you like.</p>
            <p>A good wallet app for your phone is <a target="_blank" href="https://bluewallet.io/">Blue Wallet</a></p>
            <p>The most important thing to remember is to NEVER share your seed phrase with anyone, or even store it on the internet, as it's the only thing someome needs to access your funds.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>What is the motivation behind MinerLotto?</h4>
            <p>The idea is to create a zero-threshold mechanism for anyone to be able to mine Bitcoin.</p>
            <p>I believe the entire world should be invested in Bitcoin, as it's the only way for ordinary people to free themselves of the shackles of increasing global totalitarianism.</p>
            <p>If you think your political views don't matter because you don't have anything to hide, just wait until Digital ID and Central Bank Digital Currencies are implemented and whoever is in charge have the power to take everyting away from you.</p>
            <p>In fact, your money is already being taken from you, through inflation, day after day.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>What is Bitcoin?</h4>
            <p>Bitcoin is money.</p>
            <p>It's the first ever form of money that cannot be corrupted, inflated or stolen by any central authority.</p>
            <p>The magic behind Bitcoin lies in it's decentralised nature, which requires mining to secure it.</p>
            <p>The works of <a target="_blank" href="https://saifedean.com/">Saifedean Ammous</a> is highly recommended for those who wish to fully understand Bitcoin in context of the world.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>What is Bitcoin mining?</h4>
            <p>Mining is the method by which the Bitcoin network is secured.</p>
            <p>Without mining, a central trusted authority would be required to keep the transaction ledger in balance.</p>
            <p>Bitcoin uses Proof Of Work (POW) as it's mining mechanism, as it's the most secure way to audit a decentralised ledger.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>How does mining work?</h4>
            <p>An easy and shallow analogy is to guess the weight of a wheelbarrow full of rocks, down to the milligram, as many times as you want, till you guess the correct number.</p>
            <p>The faster you can guess numbers, the better your chances of guessing the right number. So when using a computer, faster computers have better chances.</p>
            <p>A deeper explanation is that mining requires verifiable and repeatable calculations based on the contents of new blocks of transactions.</p>
            <p>A miner would prepare blocks containing new transactions and attemt to include a hash (a number representing the contents of the block) below a certain threshold.</p>
            <p>When the hash is above the threshold, the miner would change a number on the block and make another attempt, until it results in a low enough number, or someone else got it right and the miner has to start with a new block.</p>
            <p>The threshold is called the 'difficulty' and is automatically adjusted so that new blocks will only be mined every 10 minutes on average.</p>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h4>What are my chances at winning the lottery?</h4>
            <p>To be honest, quite small. But that's why it's a lottery.</p>
            <p>It depends on the number of calculations your browser can make before someone else got it right.</p>
            <p>But all it takes is one correct calculation, and you've won!</p>
            <p>To earn money with Bitcoin mining, you basically have 3 options:</p>
            <ul>
              <li>
                <p>Buy expensive mining equipment, run your own Bitcoin node and try winning your own lottery.</p>
                <p>You run the risk of never winning, and losing out on the hardware investment.</p>
              </li>
              <li>
                <p>Buy expensive mining equipment, join a mining pool, and earn steady rewards.</p>
                <p>This works as long as the cost of the harware plus electricity used is less than the money earned.</p>
              </li>
              <li>
                <p>Without buying anything, simply run MinerLotto in your browser.</p>
                <p>Your chances are significantly lower than when buying dedicated mining equipment, but at least you don't have any upfront costs, and the additional electricity usage is small.</p>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}
 
export default Faq;