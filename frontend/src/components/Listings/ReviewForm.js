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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleReview = (e) => {
    e.preventDefault();
    const review = {
      title,
      content,
    };

    axiosInstance
      .post(`listings/review/${listingId.listingId}`, review)
      .then((res) => {
        console.log('review submitted'); //need to render a message
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.ReviewForm}>
      <Form onSubmit={(e) => handleReview(e)}>
        <Form.Group controlId='exampleForm.ControlInput1'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='Best house ever...'
          />
        </Form.Group>
        <Form.Group controlId='exampleForm.ControlTextarea1'>
          <Form.Label>Write review here</Form.Label>
          <Form.Control
            as='textarea'
            rows={2}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button variant='secondary' type='submit' block>
          SUBMIT
        </Button>
      </Form>
    </Container>
  );
};

export default ReviewForm;
