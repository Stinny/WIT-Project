import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//material ui
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

//antd
import { Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css';

const useStyles = {
  formBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '30px',
    width: '900px',
  },
  stepBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    width: '300px',
    height: '300px',
  },
  headerBox: {
    backgroundColor: 'white',
    marginTop: '20px',
    width: '820px',
    height: '125px',
  },
  text: {
    fontWeight: 'bold',
  },
};

class imgUpload extends Component {
  state = {
    selectedFiles: null,
    uploaded: false,
  };

  //sets state with the files given in the form
  fileChangeHandler = (e) => {
    this.setState({ selectedFiles: e.target.files });
  };

  //function that creates form data of all chosen files and sends to API
  //need a way of checking the file size and type
  fileUploader = (listingId) => {
    const data = new FormData(); //this formdata is sent to the server
    let selectedFiles = this.state.selectedFiles;

    //if a file has been selected
    if (this.state.selectedFiles) {
      //for loop to loop through the selected files and add them to the form data
      for (let i = 0; i < selectedFiles.length; i++) {
        data.append('listingImage', selectedFiles[i], selectedFiles[i].name);
      }

      console.log(listingId);

      axios
        .post(
          `http://localhost:3030/api/listings/${listingId}/uploadimages`,
          data,
          {
            headers: {
              accept: 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ uploaded: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    if (!this.props.isAuth) {
      return <Redirect to='/login' />;
    }

    if (this.state.uploaded) {
      return <Redirect to='/profile' />;
    }

    const { classes } = this.props;
    const { listingId } = this.props.match.params;

    return (
      <>
        <Row align='center'>
          <Col>
            <Container className={classes.headerBox}>
              <Typography variant='h3' align='center'>
                Listing On Kretey
              </Typography>
              <Typography
                variant='subtitle1'
                color='textSecondary'
                align='center'
              >
                Listing on Kretey is a simple two step process until your
                property is ready for renters. Submit all the details and upload
                some beautiful pictures
              </Typography>
            </Container>
          </Col>
        </Row>

        <Row align='center' gutter={20}>
          <Col>
            <Container className={classes.stepBox}>
              <Typography variant='h2'>Step 2/2</Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                This is the second step to listing your property here on Kretey.
                Upload some wonderful pictures and put your place on display for
                renters!
              </Typography>
            </Container>
          </Col>

          <Col>
            <Container className={classes.formBox}>
              <Form>
                <input type='file' multiple onChange={this.fileChangeHandler} />
                <Button
                  variant='secondary'
                  onClick={() => this.fileUploader(listingId)}
                  block
                >
                  UPLOAD & FINISH
                </Button>
              </Form>
            </Container>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.users.isAuth,
});

export default connect(mapStateToProps)(withStyles(useStyles)(imgUpload));
