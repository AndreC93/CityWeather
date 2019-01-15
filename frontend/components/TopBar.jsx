import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import HeaderBar from "./HeaderBar.jsx";
import SearchBar from "./SearchBar.jsx";

export default withRouter(class TopBar extends Component {
  render() {
    const address = this.props.history.location.pathname;

    return (
      <div id='topBar' >
        <div className='divider' ></div>
        <div id='searchContainer' >
          <HeaderBar address={address} />
          <SearchBar/>
        </div>
        <div className='divider' ></div>
      </div>
    )
  }
});
