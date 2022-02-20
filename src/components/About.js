import React, { Component } from "react";
 
class Stuff extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
        <p>This is a distributed Bitcoin Miner that pays out the winnings to one lucky user.</p>
 
        <p>Every ~10 minutes a new block is mined, by dividing the mining calculation over all connected browsers.</p>

        <p>Most of the proceeds go to the winning miner, sans a small percantage which are allocated to operational costs and supporting important Bitcoin projects.</p>

      </div>
    );
  }
}
 
export default Stuff;