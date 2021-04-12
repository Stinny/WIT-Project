import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

//material ui
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

class imgUploadCopy extends Component {
  state = {
    selectedFiles: null,
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

    const { listingId } = this.props.match.params;
    return (
      <Container maxWidth='md' style={{ marginTop: '100px' }}>
        <form>
          <input type='file' multiple onChange={this.fileChangeHandler} />
          <Button color='primary' onClick={() => this.fileUploader(listingId)}>
            Upload Image
          </Button>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.users.isAuth,
});

export default connect(mapStateToProps)(imgUploadCopy);
