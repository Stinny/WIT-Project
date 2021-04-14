import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink, Redirect } from 'react-router-dom';
import axiosInstance from '../api';
import EditListingCard from './Listings/EditListingCard';

//material ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';

//antd
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';

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

const YourRes = () => {
  const classes = useStyles();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/reservations/listing')
      .then((res) => {
        setReservations(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //   const displayListings = (
  //     <Row gutter={18}>
  //       {listings.map((listing, index) => (
  //         <Col key={index}>
  //           <EditListingCard listing={listing} />
  //         </Col>
  //       ))}
  //     </Row>
  //   );

  const displayNoReservations = (
    <Container>
      <Typography align='center' variant='h4' color='textSecondary'>
        No reservations have been made for your listings
      </Typography>
    </Container>
  );

  if (loading) {
    return (
      <Container>
        <h3>loading</h3>
      </Container>
    );
  }

  return (
    <Container>
      {/* conditional rendering */}
      {reservations.length > 0 ? (
        <Row gutter={18}>
          {reservations.map((reservation, index) => (
            <h1>{reservation.listingId}</h1>
          ))}
        </Row>
      ) : (
        displayNoReservations
      )}
    </Container>
  );
};

export default YourRes;
