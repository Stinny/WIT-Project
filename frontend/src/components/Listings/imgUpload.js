import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Redirect, useParams } from 'react-router-dom';

//material ui
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

//bootstrap
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';

//antd
import { Row, Col, Upload, Modal, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const useStyles = makeStyles({
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
});

const ImagesUpload = () => {
  const { listingId } = useParams();
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState({});

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleChange = (e) => {
    setSelectedFiles(e.fileList);
  };

  const fileUploader = () => {
    const formData = new FormData();

    if (selectedFiles) {
      //for loop to loop through the selected files and add them to the form data
      // selectedFiles.map((file, index) => {
      //   formData.append('listingImages', file, file.name);
      // });
      for (let i = 0; i < selectedFiles.length; i++) {
        console.log(selectedFiles[i]);
        formData.append('listingImage', selectedFiles[i], selectedFiles[i]);
      }

      axios
        .post(`http://localhost:3030/api/listings/${listingId}/uploadimages`, {
          data: formData,
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
              Listing on Kretey is a simple two step process until your property
              is ready for renters. Submit all the details and upload some
              beautiful pictures
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
              <Upload listType='picture-card' onChange={handleChange} multiple>
                {uploadButton}
              </Upload>
              <Modal>
                <img alt='example' style={{ width: '100%' }} />
              </Modal>
              <Button variant='secondary' onClick={fileUploader} block>
                UPLOAD & FINISH
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default ImagesUpload;
