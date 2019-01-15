import React, { Component } from 'react';
import DashboardItem from './DashboardItem.jsx';

export default class Dashboard extends Component {

  render() {
    const {cities} = this.props;
    
    return (
      <div id='dashContainer'>
        <h1 className='welcome' >Welcome to City Weather</h1>
        <div className='dashboard' >
          {cities.map( (city, idx) => {
            if(this.props.storedWeather[city]) {
              return (
              <DashboardItem
                name={city}
                key={idx}
                storedWeather={this.props.storedWeather[city]}
              />);
            }
            })
          }
        </div>
      </div>
    )
  }
};