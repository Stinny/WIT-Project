import React, { Component } from 'react';
import { Link as RouteLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/users';

//material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  box: {
    backgroundColor: 'white',
    width: '500px',
    height: '600px',
    marginTop: '75px',
    paddingTop: '20px',
  },
};

class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = this.state;
    if (password !== password2) {
      console.log('Passwords do not match.');
    } else {
      const newUser = {
        username,
        email,
        password,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    if (this.props.isAuth) {
      return <Redirect to='/' />;
    }

    const { classes } = this.props;

    return (
      <Container component='main' maxWidth='xs' className={classes.box}>
        <CssBaseline />
        <div>
          <Typography component='h1' variant='h3' align='center'>
            Sign Up
          </Typography>
          <form noValidate>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              autoComplete='username'
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={this.onChange}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password2'
              label='Confirm Password'
              type='password'
              id='password2'
              autoComplete='current-password'
              onChange={this.onChange}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              onClick={this.onSubmit}
            >
              SIGN UP
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouteLink} to={'/login'} variant='body2'>
                  {'Already have an account? Login'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.users.isAuth,
});

export default connect(mapStateToProps, { register })(
  withStyles(useStyles)(Signup)
);
