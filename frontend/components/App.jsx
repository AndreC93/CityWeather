import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import City from './City.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultCities = [
      'New York',
      'Dallas',
      'San Francisco',
      'Chicago',
      'Seattle'
    ];
    this.state = {};
    this.addWeather = this.addWeather.bind(this);
  }

  addWeather(city, attrs) {
    const size = Object.keys(this.state).length;
    this.setState({
      [city]: attrs.concat(size),
    });
  }

  render() {
    let cities = this.defaultCities;
    
    if(Object.keys(this.state).length) {
      cities = Object.keys(this.state);
    }
    
    return (
      <div>
        <Switch>
          <Route 
            exact path='/' 
            render={ props => <Dashboard {...props} cities={cities} addWeather={this.addWeather} storedWeather={this.state} />}
          />
          <Route 
            path='/' 
            render={ props => <City {...props} addWeather={this.addWeather} storedWeather={this.state} />} 
          />
        </Switch>
      </div>
    );
  }

}

export default App;
