import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import SearchBar from './SearchBar.jsx';
import Dashboard from './Dashboard.jsx';
import CityShow from './CityShow.jsx';
import { fetchWeather, parseData } from "../util/weather-util.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.defaultCities = [
      'New York',
      'Miami',
      'San Francisco',
      'Chicago',
      'Seattle'
    ];
    this.state = {};
    this.interval = null;
  }
  
  componentDidMount() {
    this.fetchWeatherForCities();
    this.interval = setInterval( () => this.fetchWeatherForCities(), 10000);
  }

  componentWillUpdate() {
    const address = this.props.history.location.pathname;
    if(address !== '/') {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    } else if (!this.interval) {
      this.fetchWeatherForCities();
      this.interval = setInterval(() => this.fetchWeatherForCities(), 10000);
    }
  }

  fetchWeatherForCities() {
    this.defaultCities.forEach(city => {
      fetchWeather(city)
        .then(data => this.handleSuccess(data, city))
        .catch(err => err);
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSuccess(data, city) {
    const newState = parseData(data);
    this.setState({ [city]: newState });
  }

  render() {
    return (
      <div id='App' >
        <SearchBar />
        <Switch>
          <Route 
            exact path='/' 
            render={props => <Dashboard {...props} cities={this.defaultCities} storedWeather={this.state} />}
          />
          <Route 
            path='/' 
            render={ props => <CityShow {...props} storedWeather={this.state} />} 
          />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App);
