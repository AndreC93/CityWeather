import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

export default withRouter(class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
    };
  }

  handleInput(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.input) {
      this.props.history.push(`/${this.state.input}`);
      this.setState({
        input: '',
      });
    }
  }

  render() {
    return (
      <form id='searchBar' onSubmit={ (e) => this.handleSubmit(e) } >
          <input 
            placeholder='City Name' 
            onChange={ (e) => this.handleInput(e) } 
            value={ this.state.input }
          ></input>
          <button>Search</button>
      </form>
    )
  }
});
