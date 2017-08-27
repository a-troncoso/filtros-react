import React, { Component } from 'react';
import './Filters.css';

class Filters extends Component {
  render() {
    return (
      <div className="Filters">
        <p><strong>Companies</strong></p>

        <ul>
          <li>Company A</li>
          <li>Company B</li>
          <li>Company C</li>
        </ul>

        <p><strong>Price ranges</strong></p>
        <input type="range" />

        <p><strong>Deductibles</strong></p>
        <input type="checkbox" />
        <label name="0" htmlFor="0">0</label>
        <input name="3" type="checkbox" />
        <label htmlFor="3">3</label>
        <input name="5" type="checkbox" />
        <label htmlFor="5">5</label>
        <input name="7" type="checkbox" />
        <label htmlFor="7">7</label>
      </div>
    );
  }
}

export default Filters;
