import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import TopBar from './TopBar.jsx';
import Dashboard from './Dashboard.jsx';
import CityShow from './CityShow.jsx';
import { fetchWeather, parseData } from "../util/weather-util.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.interval = null;
    this.saveState = this.saveState.bind(this);
    this.addToDashboard = this.addToDashboard.bind(this);
    this.removeFromDashboard = this.removeFromDashboard.bind(this);
  }

  initializeState() {
    const myAppState = JSON.parse(localStorage.getItem('CityWeather'));
    
    if (myAppState) {
      return myAppState;
    }

    return {
      cities: [
        'New York',
        'Miami',
        'San Francisco',
        'Chicago',
        'Seattle'
      ],
    };
  }
  
  componentDidMount() {
    window.addEventListener('beforeunload', this.saveState);
    this.fetchWeatherForCities();
    this.interval = setInterval( () => this.fetchWeatherForCities(), 10000);
  }

  saveState() {
    localStorage.setItem('CityWeather', JSON.stringify({cities: this.state.cities}));
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
    this.state.cities.forEach(city => {
      fetchWeather(city)
      .then(data => this.handleSuccess(data, city))
      .catch(err => err);
    })
  }
  
  addToDashboard(city) {
    this.state.cities.push(city);
    this.props.history.push(`/`);
  }
  
  removeFromDashboard(city) {
    this.state.cities.splice(this.state.cities.indexOf(city), 1);
    this.props.history.push(`/`);
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.saveState);
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
              cities={this.state.cities} 
              storedWeather={this.state} 
              addToDashboard={this.addToDashboard} 
              removeFromDashboard={this.removeFromDashboard} />}
          />
          <Route 
            path='/' 
            render={props => <CityShow {...props} 
              cities={this.state.cities} 
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
