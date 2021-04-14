import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink, Redirect } from 'react-router-dom';
import axiosInstance from '../../api';

//material ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles({
  reviewForm: {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '30px',
    width: '900px',
  },
  resBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '30px',
  },
  bookingView: {
    backgroundColor: 'white',
    height: '375px',
    width: '260px',
    marginTop: '30px',
    marginBottom: '20px',
    paddingTop: '20px',
  },
  bookButt: {
    margin: 'auto',
    width: '200px',
  },
  bookButtLogin: {
    width: '200px',
  },
});

const ReserveForm = (listing) => {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.users.isAuth);
  const [numGuests, setNumGuests] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [resMade, setResMade] = useState(false);

  const reservation = {
    numberOfGuests: numGuests,
    startDate: startDate,
    endDate: endDate,
  };

  const handleReservation = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/reservations/create/${listing.listing._id}`, reservation)
      .then((res) => {
        setResMade(true);
      })
      .catch((err) => console.log(err));
  };

  if (!isAuth) {
    return (
      <Link component={RouteLink} to='/login'>
        <Button
          color='primary'
          variant='contained'
          className={classes.bookButtLogin}
        >
          LOGIN TO RESERVE
        </Button>
      </Link>
    );
  }

  if (resMade) {
    return <Redirect to={'/reservation/confirm'} />;
  }

  return (
    <Form onSubmit={(e) => handleReservation(e)}>
      <div
        style={{
          backgroundColor: 'white',
          width: '200px',
          height: '50px',
        }}
      >
        <Typography variant='h5'>${listing.listing.price} /night</Typography>
      </div>

      <div
        style={{
          backgroundColor: '#f7f7f7',
          width: '200px',
          height: '225px',
          marginBottom: '10px',
        }}
      >
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Number Of Guests</Form.Label>
          <Form.Control
            type='number'
            onChange={(e) => setNumGuests(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type='date'
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type='date'
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>
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
          type='submit'
        >
          Reserve
        </Button>
        <Typography variant='subtitle2' color='textSecondary' align='center'>
          Not charged yet
        </Typography>
      </div>
    </Form>
  );
};

export default ReserveForm;
