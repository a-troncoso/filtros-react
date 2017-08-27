import React, { Component } from 'react';
import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'

import Filters from '../Filters'
import Company from '../Company'

import './App.css';

const client = new Lokka({
  transport: new Transport(
    'https://api.graph.cool/simple/v1/cj3aab8m2f6qz0182y9lliztm?query=%7B%0A%20%20allCompanies%20%7B%20%0A%20%20%20%20id%2C%20%0A%20%20%20%20name%20%0A%20%20%7D%20%0A%7D',
   )
});

class App extends Component {

  constructor() {
    super()

    this.state = {
      companies: []
    }
  }

  componentWillMount() {
    // this.state.companies = this.getCompanies()

    this.getCompanies()
      .then(success => console.log(success))
      .catch(error => console.error(error))
    this.getOffers()
      .then(success => console.log(success))
      .catch(error => console.error(error))
  }

  getCompanies() {
    return client.query(`
      {
        allCompanies {
          id,
          name
        }
      }
    `)
  }

  getOffers() {
    return client.query(`
      {
        allOffers {
          id,
          price,
          deductible
        }
      }
    `)
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-one-third">
            <Filters></Filters>
          </div>
          <div className="column">
            <div className="columns">
              <div className="column">
                <p>4 Results</p>
              </div>
              <div className="column">
                <select>
                  <option disabled>Sort by...</option>
                  <option value="company">Company</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
            <div className="columns">
              <div className="column">
                <Company></Company>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
