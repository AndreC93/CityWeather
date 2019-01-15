import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TopBar from './TopBar.jsx';
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
    this.addToDashboard = this.addToDashboard.bind(this);
    this.removeFromDashboard = this.removeFromDashboard.bind(this);
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

  addToDashboard(city) {
    this.defaultCities.push(city);
    this.props.history.push(`/`);
  }

  removeFromDashboard(city) {
    this.defaultCities.splice(this.defaultCities.indexOf(city), 1);
    this.props.history.push(`/`);
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
        <TopBar/>
        <Switch>
          <Route 
            exact path='/' 
            render={props => <Dashboard {...props} 
              cities={this.defaultCities} 
              storedWeather={this.state} 
              addToDashboard={this.addToDashboard} 
              removeFromDashboard={this.removeFromDashboard} />}
          />
          <Route 
            path='/' 
            render={props => <CityShow {...props} 
              cities={this.defaultCities} 
              storedWeather={this.state} 
              addToDashboard={this.addToDashboard} 
              removeFromDashboard={this.removeFromDashboard} />} 
          />
        </Switch>
      </div>
    );
  }

}

export default withRouter(App);
