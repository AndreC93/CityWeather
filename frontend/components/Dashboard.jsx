import React, { Component } from 'react';
import City from './City.jsx';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {

  render() {
    const cities = this.props.cities;
    
    return (
      <div className='dashboard' >
        {cities.map( (city, idx) => 
          <City 
            name={city} 
            key={idx} 
            addWeather={this.props.addWeather} 
            dashboard={true}
            storedWeather={this.props.storedWeather[city]}
          />)}
      </div>
    )
  }
}

export default withRouter(Dashboard);