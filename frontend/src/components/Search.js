import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';

//material ui
import { withStyles } from '@material-ui/core/styles';
import { Container, Typography, Button, Link } from '@material-ui/core';

//antd
import { DatePicker, Space } from 'antd';

const useStyles = {
  box: {
    marginTop: '30px',
    height: '300px',
    backgroundColor: 'white',
    textAlign: 'center',
    paddingTop: '8px',
  },
  img: {
    height: '400px',
    width: '900px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

class Search extends Component {
  render() {
    const { classes } = this.props;
    const { RangePicker } = DatePicker;

    return (
      <>
        <Container maxWidth='md' className={classes.box}>
          <Typography variant='h1' align='center'>
            Kretey
          </Typography>
          <Typography
            variant='subtitle1'
            align='center'
            color='textSecondary'
            style={{ marginTop: '5px' }}
          >
            Peer to peer vavation rentals powered by Bitcoin
          </Typography>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/signup'
            variant='inherit'
          >
            <Button variant='outlined' color='primary'>
              Host Now
            </Button>
          </Link>
        </Container>
      </>
    );
  }
}

export default withStyles(useStyles)(Search);
