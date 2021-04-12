import React from 'react';
import { Link as RouteLink } from 'react-router-dom';

//material ui
import {
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//antd
import Statistic from 'antd';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    width: '450px',
    height: '225px',
  },
});

const EditListingCard = ({ listing }, index) => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card} key={index}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='Listing Image'
            height='100'
            image={listing.imgUrls[0]}
          />
          <CardContent>
            <Typography variant='h6'>{listing.title}</Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {listing.price} /night
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size='small' variant='outlined'>
            <Link component={RouteLink} to={`listing/${listing._id}`}>
              View
            </Link>
          </Button>
          <Button size='small' variant='outlined'>
            <Link component={RouteLink} to={`listing/edit/${listing._id}`}>
              Edit
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default EditListingCard;
