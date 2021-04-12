import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getListing } from '../../actions/listings';
import axiosInstance from '../../api';
import ReviewForm from '../Listings/ReviewForm';
import Reviews from '../Listings/Reviews';

//material ui
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import moment from 'moment';

//antd
import { Row, Col, Carousel, Comment, Tooltip, Avatar, Divider } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const useStyles = makeStyles({
  titleView: {
    backgroundColor: 'white',
    height: '100px',
    width: '960px',
    marginTop: '30px',
    padding: '5px',
    paddingLeft: '20px',
  },
  listingView: {
    backgroundColor: 'white',
    height: '450px',
    width: '670px',
    marginTop: '30px',
    marginBottom: '20px',
    marginRight: '30px',
  },
  listingDetails: {
    backgroundColor: 'white',
    height: '350px',
    marginTop: '12px',
  },
  bookingView: {
    backgroundColor: 'white',
    height: '375px',
    width: '260px',
    marginTop: '30px',
    marginBottom: '20px',
    paddingTop: '20px',
  },
  reviewView: {
    backgroundColor: 'white',
    height: '400px',
    marginTop: '30px',
  },
  listingImg: {
    width: '650px',
    height: '430px',
    marginTop: '10px',
  },
  bookButt: {
    margin: 'auto',
    width: '200px',
  },
});

const Detail = () => {
  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { listingId } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/listings/${listingId}`)
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <>
        <Row justify='center'>
          <Col>
            <Container className={classes.listingView}></Container>
          </Col>

          <Col>
            <Container className={classes.bookingView}></Container>
          </Col>
        </Row>

        <Row justify='center'>
          <Container
            className={classes.listingDetails}
            maxWidth='md'
          ></Container>
        </Row>

        <Row justify='center'>
          <Container maxWidth='md' className={classes.reviewView}></Container>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row justify='center'>
        <Container className={classes.titleView} maxWidth='md'>
          <Typography variant='h4'>{listing.title}</Typography>
          <Typography color='textSecondary'>
            {listing.numberOfGuests} guests | {listing.numberOfRooms} rooms |{' '}
            {listing.numberOfBeds} beds | {listing.numberOfBaths} baths
          </Typography>
        </Container>
      </Row>

      <Row justify='center'>
        <Col>
          <Container className={classes.listingView}>
            <Carousel>
              {listing.imgUrls &&
                listing.imgUrls.map((img) => (
                  <div>
                    <img src={img} className={classes.listingImg}></img>
                  </div>
                ))}
            </Carousel>
          </Container>
        </Col>

        <Col>
          <Container className={classes.bookingView}>
            <div
              style={{
                backgroundColor: 'white',
                width: '200px',
                height: '50px',
              }}
            >
              <Typography variant='h5'>${listing.price} /night</Typography>
            </div>

            <div
              style={{
                backgroundColor: '#f7f7f7',
                width: '200px',
                height: '200px',
                marginBottom: '10px',
              }}
            >
              <Typography variant='subtitle1'>Start Date</Typography>
              <Typography variant='subtitle1'>End Date</Typography>
            </div>

            <div
              style={{
                backgroundColor: 'white',
                width: '200px',
                height: '50px',
              }}
            >
              <Button
                color='primary'
                variant='contained'
                className={classes.bookButt}
              >
                Reserve
              </Button>
              <Typography
                variant='subtitle2'
                color='textSecondary'
                align='center'
              >
                Not charged yet
              </Typography>
            </div>
          </Container>
        </Col>
      </Row>

      <Row justify='center'>
        <Container className={classes.listingDetails} maxWidth='md'>
          <div>
            <Typography variant='h5'>Entire Place Hosted By Maria</Typography>
            <Avatar
              src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              alt='Han Solo'
            />

            <Divider />
          </div>
        </Container>
      </Row>

      <Row justify='center'>
        <Container maxWidth='md' className={classes.reviewView}>
          <Typography variant='h4'>Reviews</Typography>
          <ReviewForm listingId={listing._id} />
          <Reviews listingId={listing._id} />
        </Container>
      </Row>
    </>
  );
};

export default Detail;
