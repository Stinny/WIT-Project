import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/users';
import kretlogo from '../imgs/kretlogo2.png';

//material ui
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  withStyles,
  Container,
} from '@material-ui/core';

const useStyles = {
  header: {
    backgroundColor: 'white',
    borderBottom: '2px solid black',
  },
  logo: {
    color: 'black',
    marginLeft: '20px',
    font: 'Lato',
  },
  imgLogo: {
    width: '200px',
    height: '75px',
    marginLeft: '100px',
  },
  linkBox: {
    marginLeft: '900px',
  },
  link: {
    color: 'black',
    padding: '10px',
    fontWeight: 'bold',
    fontFamily: 'Lato',
  },
};

class Header extends Component {
  render() {
    const { classes } = this.props;

    const imgLogo = (
      <Link component={RouterLink} to='/' color='inherit'>
        <img src={kretlogo} className={classes.imgLogo}></img>
      </Link>
    );

    const authLinks = (
      <Container className={classes.linkBox}>
        <Typography variant='h6'>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/about'
            color='inherit'
            variant='inherit'
          >
            About
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/contact'
            color='inherit'
            variant='inherit'
          >
            Contact
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/profile'
            color='inherit'
            variant='inherit'
          >
            Profile
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/listing/create'
            color='inherit'
            variant='inherit'
          >
            <Button variant='outlined' color='primary'>
              Create Listing
            </Button>
          </Link>
          <Button onClick={this.props.logout} variant='outlined'>
            Logout
          </Button>
        </Typography>
      </Container>
    );

    const guestLinks = (
      <Container className={classes.linkBox} disableGutters>
        <Typography variant='h6'>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/about'
            color='inherit'
            variant='inherit'
          >
            About
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/contact'
            color='inherit'
            variant='inherit'
          >
            Contact
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/signup'
            color='inherit'
            variant='inherit'
          >
            <Button color='primary' variant='outlined'>
              Signup
            </Button>
          </Link>
          <Link
            className={classes.link}
            component={RouterLink}
            to='/login'
            color='inherit'
            variant='inherit'
          >
            <Button variant='outlined'>Login</Button>
          </Link>
        </Typography>
      </Container>
    );

    return (
      <>
        <AppBar position='static' className={classes.header}>
          <Toolbar>
            {imgLogo}
            {this.props.isAuth ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.users.isAuth,
});

export default connect(mapStateToProps, { logout })(
  withStyles(useStyles)(Header)
);
