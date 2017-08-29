import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	offer: PropTypes.object.isRequired
}

class Offer extends Component {
  render() {
    return (
      <div className="box">
          <div className="columns">

            <div className="column is-two-thirds">
             <figure>
                <img src={this.props.offer.company.imageUrl} alt={this.props.offer.company.name}/>
              </figure>
              <p className="has-text-centered">{this.props.offer.company.name}</p>
            </div>

            <div className="column">
              <dl>
                <dt>Price:</dt>
                <dd>{this.props.offer.price}</dd>
                <dt>Deductible:</dt>
                <dd>{this.props.offer.deductible}</dd>
              </dl>
            </div>

          </div>
      </div>
    );
  }
}

Offer.propTypes = propTypes

export default Offer;
