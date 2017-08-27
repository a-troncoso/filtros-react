import React, { Component } from 'react';
import './company.css';

class Company extends Component {
  render() {
    return (
      <div className="company">
        <div className="container">
          <div className="columns">

            <div className="column is-one-third">
              <figure>
                <img src="http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif" alt="company_img"></img>
              </figure>
              <p>Company name</p>
            </div>

            <div className="column">
              <dl>
                <dt>Price:</dt>
                <dd>1000</dd>
                <dt>Deductible:</dt>
                <dd>2</dd>
              </dl>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Company;
