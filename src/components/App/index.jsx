import React, { Component } from 'react';
import { Lokka } from 'lokka'
import { Transport } from 'lokka-transport-http'

import Filters from '../Filters'
import Offer from '../Offer'

import './App.css';

const client = new Lokka({
  transport: new Transport( 'https://api.graph.cool/simple/v1/cj3aab8m2f6qz0182y9lliztm' )
});

class App extends Component {

  constructor() {
    super()

    this.state = {
      companies: [],
      allOfers: [],
      filteredOffers: [],
      sortBy: 'sortBy'
    }

    this.handleFilter = this.handleFilter.bind(this)
    this.onChangeSortBy = this.onChangeSortBy.bind(this)
  }

  componentWillMount() {

    // Get list of all companies
    this.getCompanies()
      .then(success => this.setState({ companies: success.allCompanies }))
      .catch(error => console.error(error))

    // Get list of all offers
    this.getOffers()
      .then(success => {
        this.setState({
          allOffers: success.allOffers,
          filteredOffers: success.allOffers
        })
      })
      .catch(error => console.error(error))
  }

  getCompanies() {
    return client.query('{ allCompanies { id, name } }')
  }

  getOffers() {
    return client.query('{ allOffers { id, price, deductible, company { id, name, imageUrl } } }')
  }

  // Return and render Filter component
  renderFilters () {
    if (this.state.companies.length > 0)
      return ( <Filters companies={this.state.companies} onFilter={this.handleFilter}></Filters> )
  }

  // Return and render each offer
  renderFilteredOffers() {
    if (this.state.filteredOffers.length > 0) {
      return (
        this.state.filteredOffers.map((o, k) => ( <Offer key={k} offer={o}></Offer> ))
      )
    }
  }

  // Handles filter every time it is updated
  handleFilter (filter) {

    let allOffers = this.state.allOffers
    let byCompany = []
    let byDeductible = []
    let byPrice = []

    allOffers.map(offer => {
      filter.companies.map(c => {
        if (c.selected && c.id === offer.company.id)
          byCompany.push(offer)
      })
    })

    byCompany.map(offer => {
      filter.deductibles.map(d => {
        if (d.selected && d.value === offer.deductible)
          byDeductible.push(offer)
      })
    })

    byDeductible.map(offer => {
      if (offer.price <= parseInt(filter.price))
        byPrice.push(offer)
    })

    this.setState({
      filteredOffers: byPrice
    })

  }

  onChangeSortBy (event) {
    this.setState({ sortBy: event.target.value })
    const filteredOffers  = this.state.filteredOffers
    let offersSorted = []

    if (event.target.value === 'company') {
      offersSorted = filteredOffers.sort(this.compareCompanyNames)
    } else if (event.target.value === 'price') {
      offersSorted = filteredOffers.sort(this.comparePrices)
    } else if (event.target.value === 'deductible') {
      offersSorted = filteredOffers.sort(this.compareDeductibles)
    }

    this.setState({ filteredOffers: offersSorted })
  }

  compareCompanyNames (a, b) {
    if (a.company.name < b.company.name) return -1
    if (a.company.name > b.company.name) return 1
    return 0
  }

  comparePrices (a, b) {
    if (a.price < b.price) return -1
    if (a.price > b.price) return 1
    return 0
  }

  compareDeductibles (a, b) {
    if (a.deductible < b.deductible) return -1
    if (a.deductible > b.deductible) return 1
    return 0
  }

  render() {
    return (
      <div className="container content">
        <div className="columns">
          <div className="column is-one-quarter">
            {this.renderFilters()}
          </div>
          <div className="column is-three-quarters">
            <div className="columns">
              <div className="column">
                <p>{this.state.filteredOffers.length} results</p>
              </div>
              <div className="column">
                <div className="select">
                  <select onChange={this.onChangeSortBy} value={this.state.sortBy}>
                    <option disabled value="sortBy">Sort by...</option>
                    <option value="company">Company</option>
                    <option value="deductible">Deductible</option>
                    <option value="price">Price</option>
                  </select>
                </div>
              </div>
            </div>
            {this.state.filteredOffers.length === 0 && <div className="columns">
              <div className="column">
                <article className="message is-warning">
                  <div className="message-body">
                    No offers to show
                  </div>
                </article>
              </div>
            </div>}
            <div className="columns">
              <div className="column is-three-quarters">
                {this.renderFilteredOffers()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
