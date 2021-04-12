import React, { Component } from 'react';
import Listings from '../components/Listings/Listings';
import Jumbo from './Search';
import { connect } from 'react-redux';

class Home extends Component {
  render() {
    const listing = {
      title: 'this is a listing',
      price: '$200',
    };

    return (
      <>
        <Jumbo />
        <Listings />
      </>
    );
  }
}

export default Home;
