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
    width: '275px',
    height: '300px',
  },
});

const ListingCard = ({ listing, index }) => {
  const classes = useStyles();

  return (
    <>
      <Link component={RouteLink} to={`listing/${listing._id}`}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              component='img'
              alt='Listing Image'
              height='140'
              image={listing.imgUrls[0]}
              title='Listing image'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {listing.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
                {listing.price} /night
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size='small' variant='outlined'>
              Book
            </Button>
          </CardActions>
        </Card>
      </Link>
    </>
  );
};

export default ListingCard;
