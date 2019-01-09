import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import City from './City.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.addWeather = this.addWeather.bind(this);
  }

  addWeather(city, attrs) {
    this.setState({
      [city]: attrs,
    });
  }

  render() {
    return (
      <div>
        <Switch>
          <Route 
            exact path='/' 
            render={ props => <Dashboard {...props} addWeather={this.addWeather} />}
          />
          <Route 
            path='/' 
            render={ props => <City {...props} addWeather={this.addWeather} />} 
          />
        </Switch>
      </div>
    );
  }

}

export default App;
