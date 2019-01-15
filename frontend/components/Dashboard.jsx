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
    this.interval = setInterval(() => this.updateTimeAndDate(), 1000); 
  }

  updateTimeAndDate() {
    this.setState({
      date: this.generateDate(),
      time: this.generateTime(),
    });
  }

  generateDate() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = days[new Date().getDay()];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Oct', 'Nov', 'Dec'];
    const month = months[new Date().getMonth()];
    const date = new Date().getDate();
    const year = new Date().getFullYear();
    return `${day}, ${month} ${date}, ${year}`;
  }
  
  generateTime() {
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    hours %= 12;

    return `${hours ? hours : '12'}:${minutes > 10 ? minutes : '0' + minutes} ${amOrPm}`;
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {cities} = this.props;
    let {date, time} = this.state;
    if(!date) {
      date = this.generateDate();
      time = this.generateTime();
    }

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