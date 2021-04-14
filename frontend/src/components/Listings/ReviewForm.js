import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouteLink } from 'react-router-dom';
import axiosInstance from '../../api';

//material ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';
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
});

const ReviewForm = (listingId) => {
  const classes = useStyles();
  const isAuth = useSelector((state) => state.users.isAuth);

  //form data
  const [content, setContent] = useState('');

  const handleReview = (e) => {
    const review = {
      content,
    };

    axiosInstance
      .post(`listings/review/${listingId.listingId}`, review)
      .then((res) => {
        console.log('review submitted'); //need to render a message
      })
      .catch((err) => console.log(err));
  };

  if (!isAuth) {
    return (
      <Container className={classes.reviewForm}>
        <Link component={RouteLink} to='/login'>
          <Button variant='secondary' type='submit' block>
            LOGIN TO WRITE A REVIEW
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className={classes.reviewForm}>
      <Form onSubmit={(e) => handleReview(e)}>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Control
            as='textarea'
            rows={2}
            onChange={(e) => setContent(e.target.value)}
            placeholder='write a review here...'
          />
        </Form.Group>
        <Button variant='secondary' type='submit' block>
          CREATE REVIEW
        </Button>
      </Form>
    </Container>
  );
};

export default ReviewForm;
