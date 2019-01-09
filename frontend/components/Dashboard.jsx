import React, { Component } from 'react';
import City from './City.jsx';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {
  constructor() {
    super();
    this.defaultCities =  [
      'New York',
      'Dallas',
      'San Francisco',
      'Chicago',
      'Seattle'
    ];
    this.state = {};
  }

  render() {
    const cities = this.cities || this.defaultCities;
    return (
      <div className='cities' >
        <div />
        {cities.map( (city, idx) => 
          <City 
            name={city} 
            key={idx} 
            addWeather={this.props.addWeather} 
            dashboard={true}
          />)}
      </div>
    )
  }
}

export default withRouter(Dashboard);