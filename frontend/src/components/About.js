import React from 'react';

//material ui
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

//antd
import { Divider } from 'antd';

const useStyles = makeStyles({
  titleBox: {
    height: '200px',
    backgroundColor: 'white',
    marginTop: '50px',
    paddingTop: '50px',
  },
  contentBox: {
    height: '625px',
    backgroundColor: 'white',
    marginTop: '15px',
    padding: '18px',
  },
  title: {
    fontFamily: 'Lato',
  },
  conTitle: {
    fontFamily: 'Lato',
  },
  conBody: {
    color: 'grey',
    fontFamily: 'Lato',
    fontSize: '18px',
    marginTop: '8px',
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <>
      <Container maxWidth='md' className={classes.titleBox}>
        <Typography className={classes.title} align='center' variant='h2'>
          What Is Kretey?
        </Typography>
      </Container>

      <Container maxWidth='md' className={classes.contentBox}>
        <Typography className={classes.conTitle} variant='h4' align='center'>
          What is Kretey's purpose?
        </Typography>
        <Typography
          className={classes.conBody}
          variant='body1'
          align='center'
          paragraph
        >
          Kretey's purpose is to give the world the ability to travel using
          crytpocurrency, allow property owners to start earning crytpocurrency,
          and bring two very powerful concepts together. Real Estate and
          Crytpocurrency.
        </Typography>

        <Divider />

        <Typography className={classes.conTitle} align='center' variant='h4'>
          Who is Kretey for?
        </Typography>
        <Typography
          className={classes.conBody}
          variant='body1'
          align='center'
          paragraph
        >
          Kretey is for people who own crytpocurrency and want to book that next
          raging vacation they can't stop thinking about OR that real esatate
          expert who wants to list their property and start earning crytpo.
        </Typography>

        <Divider />

        <Typography className={classes.conTitle} align='center' variant='h4'>
          How to book on Kretey
        </Typography>
        <Typography
          className={classes.conBody}
          variant='body1'
          align='center'
          paragraph
        >
          Booking a vacation on Kretey is very simple. Create an account, send
          crypto to the FREE wallet you now have, then on the homepage fill in
          location, start date, end date and boom pick a listing.
        </Typography>

        <Divider />

        <Typography className={classes.conTitle} align='center' variant='h4'>
          How to host on Kretey
        </Typography>
        <Typography
          className={classes.conBody}
          variant='body1'
          align='center'
          paragraph
        >
          Hosting on Kretey is also very simple. Make an account to become a
          host, upload your property details(info, images, etc..) and BOOM
          people can now book vacations with your property. All revenue goes
          straight to your crypto wallet.
        </Typography>
      </Container>
    </>
  );
};

export default About;
