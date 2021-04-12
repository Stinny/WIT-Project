import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api';

//material ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

const useStyles = makeStyles({
  formBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '30px',
    width: '900px',
  },
});

const ReviewForm = (listingId) => {
  const classes = useStyles();

  //form data
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`listings/reviews/${listingId.listingId}`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(reviews);

  return (
    <Container className={classes.ReviewForm}>
      {reviews.map((review) => {
        <h3>{review.title}</h3>;
      })}
    </Container>
  );
};

export default ReviewForm;
