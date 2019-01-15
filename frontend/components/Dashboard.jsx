import React, { Component } from 'react';
import DashboardItem from './DashboardItem.jsx';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      time: '',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.generateDate(), 1000); 
  }

  generateDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[new Date().getDay()];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Oct', 'Nov', 'Dec'];
    const month = months[new Date().getMonth()];
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    const time = new Date().toLocaleTimeString();
    this.setState({
      date: `${day}, ${month} ${date}, ${year}`,
      time,
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {cities} = this.props;
    const {date, time} = this.state;
    // if(!date) this.generateDate();

    return (
      <div id='dashContainer'>
        <h1 className='welcome' >
          <div>{date}</div>
          <div>{time}</div>
        </h1>
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