import React, { useState } from 'react';
import { Link as RouteLink, useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import axiosInstance from '../../api';

//material ui
import {
  Container,
  Typography,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Modal,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';

//antd
import Statistic from 'antd';

const useStyles = makeStyles({
  box: {
    width: '800px',
    height: '225px',
    backgroundColor: 'white',
    marginTop: '50px',
    padding: '20px',
  },
});

const ConfirmRes = () => {
  const classes = useStyles();
  const [deleted, setDeleted] = useState(false);
  const { listingId } = useParams();

  //   const handleReservation = () => {
  //     axiosInstance
  //       .delete(`/listings/delete/${listingId}`)
  //       .then((res) => {
  //         setDeleted(true);
  //       })
  //       .catch((err) => console.log(err));
  //   };

  if (deleted) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <>
      <Container maxWidth='md' className={classes.box}>
        <Typography align='center' variant='h3'>
          Your reservation has been made!
        </Typography>
        <Typography align='center' variant='subtitle1' color='textSecondary'>
          The host will contact to you for payment via Bitcoin.
        </Typography>
        <Link component={RouteLink} to={'/'}>
          <Button
            variant='secondary'
            type='submit'
            block
            style={{ marginTop: '5px' }}
          >
            Back Home
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default ConfirmRes;
