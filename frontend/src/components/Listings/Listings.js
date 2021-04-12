import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api';
import ListingCard from '../Listings/ListingCard';
import { getListings } from '../../actions/listings';
import { Link as RouteLink } from 'react-router-dom';
import PropTypes from 'prop-types';
//material ui
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//antd
import { Row, Col, Divider } from 'antd';

const useStyles = makeStyles({
  listingCon: {
    marginTop: '50px',
    backgroundColor: 'white',
    height: '780px',
  },
  colSpace: {
    marginTop: '10px',
  },
});

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const style = { background: '#0092ff', padding: '8px 0' }; //for antd grid

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/listings')
      .then((res) => {
        setListings(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <>
        <Container maxWidth='lg' className={classes.listingCon}>
          <Typography align='center' variant='h3'>
            Recent Listings
          </Typography>

          <Container></Container>
        </Container>
      </>
    );
  }

  return (
    <>
      <Container maxWidth='lg' className={classes.listingCon}>
        <Typography align='center' variant='h3'>
          Recent Listings
        </Typography>

        <Divider />

        <Row gutter={14}>
          {listings.map((listing, index) => (
            <Col className={classes.colSpace} span={6} key={index}>
              <ListingCard listing={listing} />
            </Col>
          ))}
        </Row>

        <Container></Container>
      </Container>
    </>
  );
};

export default Listings;
