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
    width: '600px',
    height: '225px',
    backgroundColor: 'white',
    marginTop: '50px',
    padding: '20px',
  },
});

const ConfirmDel = () => {
  const classes = useStyles();
  const [deleted, setDeleted] = useState(false);
  const { listingId } = useParams();

  const handleDelete = () => {
    axiosInstance
      .delete(`/listings/delete/${listingId}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  };

  if (deleted) {
    return <Redirect to={'/profile'} />;
  }

  return (
    <>
      <Container maxWidth='md' className={classes.box}>
        <Typography variant='h3'>
          Are you sure you want to delete this listing?
        </Typography>
        <Button variant='danger' type='submit' block onClick={handleDelete}>
          Yes, delete listing
        </Button>
        <Link component={RouteLink} to={'/profile'}>
          <Button
            variant='secondary'
            type='submit'
            block
            style={{ marginTop: '5px' }}
          >
            Cancel
          </Button>
        </Link>
      </Container>
    </>
  );
};

export default ConfirmDel;
