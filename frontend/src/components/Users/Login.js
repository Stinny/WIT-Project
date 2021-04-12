import React, { Component } from 'react';
import { Link as RouteLink, Redirect } from 'react-router-dom';
import { login } from '../../actions/users';
import { connect } from 'react-redux';

//material ui
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

const useStyles = {
  box: {
    backgroundColor: 'white',
    width: '500px',
    height: '400px',
    marginTop: '75px',
    paddingTop: '20px',
  },
};

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value.trim() });

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
            Login
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
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              onChange={this.onChange}
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              //className={classes.submit}
              onClick={this.onSubmit}
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant='body2'>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link component={RouteLink} to={'/signup'} variant='body2'>
                  {"Don't have an account? Sign Up"}
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

export default connect(mapStateToProps, { login })(
  withStyles(useStyles)(Login)
);
