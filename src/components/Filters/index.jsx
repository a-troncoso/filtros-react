import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	companies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onFilter: PropTypes.func.isRequired,
}

class Filters extends Component {
  constructor(props) {
		super(props)

    this.state = {
      companies: [],
      price: 150,
      deductibles: [
        {value:0, selected: true},
        {value:3, selected: true},
        {value:5, selected: true},
        {value:7, selected: true}
      ]
    }

		this.onFilter = this.onFilter.bind(this)
		this.onChangeSelectCompany = this.onChangeSelectCompany.bind(this)
		this.onChangePrice = this.onChangePrice.bind(this)
    this.onChangeSelectDeducible = this.onChangeSelectDeducible.bind(this)
	}

  componentWillMount () {
    let companies = this.props.companies
    companies.map(c => c.selected = true)
    this.setState({
      companies
    })
  }

  onFilter () {
    this.props.onFilter(this.state)
  }

  onChangeSelectCompany (idx) {
    let companies = this.state.companies
    companies[idx].selected = !companies[idx].selected

    this.setState({
      companies
    }, this.onFilter)
  }

  onChangePrice (event){
    this.setState({
      price: event.target.value
    }, this.onFilter)
  }

  onChangeSelectDeducible (idx) {
    let deductibles = this.state.deductibles
    deductibles[idx].selected = !deductibles[idx].selected

    this.setState({
      deductibles
    }, this.onFilter)
  }

  render() {
    return (
      <div className="box">
        <h3>Companies</h3>
        {this.state.companies.map((c, k) => {
          return (
						<label className="checkbox" key={k}>
							<input
								type="checkbox"
								value={c.id}
								checked={c.selected}
								onChange={() => this.onChangeSelectCompany(k)}/> {c.name}
						</label>
          )
        })}

        <h3>Price ranges ({this.state.price})</h3>
        <input className="input is-small" type="range" min="0" max="150" value={this.state.price} onChange={this.onChangePrice}/>

        <h3>Deductibles</h3>
        {this.state.deductibles.map((d, k) => {
          return (
            <div key={k}>
              <label className="checkbox">
								<input
									type="checkbox"
									id={`deducible${k}`}
									value={d.value}
									checked={d.selected}
									onChange={() => this.onChangeSelectDeducible(k)}/> {d.value}
							</label>
            </div>)
        })}
      </div>
    );
  }
}

Filters.propTypes = propTypes

export default Filters;
