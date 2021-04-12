import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { getUserListings } from '../../actions/listings';
import { getUserInfo } from '../../actions/users';
import moment from 'moment';
import EditListingCard from '../Listings/EditListingCard';

//material ui
import {
  Container,
  Typography,
  withStyles,
  Grid,
  Paper,
  Button,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import listings from '../../reducers/listings';

//antd
import {
  List,
  Avatar,
  Button as antButton,
  Skeleton,
  Row,
  Col,
  Divider,
  Statistic,
} from 'antd';
import 'antd/dist/antd.css';

const useStyles = makeStyles({
  imgBox: {
    backgroundColor: 'white',
    height: '300px',
    marginTop: '30px',
    width: '400px',
    marginRight: '10px',
  },
  userBox: {
    backgroundColor: 'white',
    height: '300px',
    width: '700px',
    marginTop: '30px',
    paddingTop: '8px',
    paddingRight: '8px',
  },
  dashBox: {
    backgroundColor: 'white',
    height: '650px',
    width: '1110px',
    marginTop: '30px',
  },
  userInfo: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  stats: {},
  font: {
    fontFamily: 'Lato',
    fontWeight: 'bolder',
  },
});

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const listings = useSelector((state) => state.listings.listings);
  const user = useSelector((state) => state.users.user);
  const isAuth = useSelector((state) => state.users.isAuth); //using hook to pull state out from store
  const classes = useStyles();
  const dispatch = useDispatch(); //need this so dispatch can be passed into the actions

  useEffect(() => {
    setLoading(true);
    getUserInfo(dispatch);
    getUserListings(dispatch);
    setLoading(false);
  }, []);

  const loadingDis = (
    <>
      <Row justify='center'>
        <Col>
          <Container className={classes.imgBox}></Container>
        </Col>
        <Col>
          <Container className={classes.userBox}></Container>
        </Col>
      </Row>

      <Row justify='center'>
        <Col>
          <Container className={classes.dashBox}></Container>
        </Col>
      </Row>
    </>
  );

  // const listings = useSelector((state) => state.listings.listings);
  // const user = useSelector((state) => state.users.user);

  if (!isAuth) {
    return <Redirect to={'/login'}></Redirect>;
  }

  if (loading) {
    return { loadingDis };
  }

  return (
    <>
      <Row justify='center'>
        <Col>
          <Container className={classes.imgBox}>
            <div className={classes.userInfo}>
              <Avatar
                size={88}
                src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
              />
              <Typography variant='h5' className={classes.font}>
                {user.userName}
              </Typography>
              <Typography
                variant='subtitle2'
                color='textSecondary'
                className={classes.font}
              >
                member since {moment(user.dateJoined).format('MMM YYYY')}
              </Typography>
            </div>
          </Container>
        </Col>
        <Col>
          <Container className={classes.userBox}>
            <Row>
              <Statistic title='Revenue This Month' value='$8,345' />
            </Row>
            <Row gutter={30}>
              <Col>
                <Statistic title='Total BTC' value='0.00234' />
              </Col>
              <Col>
                <Statistic title='Total ETH' value='0.00114' />
              </Col>
              <Col>
                <Statistic title='Total LTC' value='0.00345' />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>

      <Container className={classes.dashBox}>
        <Typography variant='h3'>Your Listings</Typography>
        <Divider />
        <Row gutter={18}>
          {listings.map((listing, index) => (
            <Col key={index}>
              <EditListingCard listing={listing} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
