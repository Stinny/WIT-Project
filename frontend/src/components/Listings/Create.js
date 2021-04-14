import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { createListing } from '../../actions/listings';
import { getUserInfo } from '../../actions/users';
import axiosInstance from '../../api';

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
import { Row, Col, Divider } from 'antd';
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

const Create = () => {
  const classes = useStyles();
  //const user = useSelector((state) => state.users.user);
  const isAuth = useSelector((state) => state.users.isAuth);
  const dispatch = useDispatch();

  //control variables
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const [newListing, setNewListing] = useState({}); //gets set once returned by API

  //listing variables
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numOfGuests, setNumOfGuests] = useState('');
  const [numOfRooms, setNumOfRooms] = useState('');
  const [numOfBaths, setNumOfBaths] = useState('');
  const [numOfBeds, setNumOfBeds] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [price, setPrice] = useState('');
  const [user, setUser] = useState({});

  const userId = user.userId;

  const listing = {
    title: title,
    description: description,
    numberOfGuests: numOfGuests,
    numberOfRooms: numOfRooms,
    numberOfBeds: numOfBeds,
    numberOfBaths: numOfBaths,
    amenities: amenities,
    price: price,
    userId: userId,
  };

  //used for getting the requesting user info
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('/auth/getuserinfo')
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err); //need to dispatch an error message here
      });
    setLoading(false);
  }, []);

  const submitListing = (e) => {
    e.preventDefault();
    axiosInstance
      .post('/listings/create', listing)
      .then((res) => {
        setNewListing(res.data);
        setCreated(true);
      })
      .catch((err) => console.log(err));
  };

  if (!isAuth) {
    return <Redirect to='/login' />;
  }

  if (created) {
    return <Redirect to={`/listing/imgupload/${newListing._id}`} />;
  }

  if (loading) {
    return <div></div>;
  }

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
              is ready for reservations
            </Typography>
          </Container>
        </Col>
      </Row>

      <Row align='center' gutter={20}>
        <Col>
          <Container className={classes.stepBox}>
            <Typography variant='h2'>Step 1/2</Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              This is the first step to listing your property here on Kretey. We
              just need some details about your property so renters know what
              they are renting!
            </Typography>
          </Container>
        </Col>

        <Col>
          <Container className={classes.formBox}>
            <Form
              onSubmit={(e) => {
                submitListing(e);
              }}
            >
              <Typography variant='h5' className={classes.text}>
                Listing Details
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                These details are crucial to catching the eyes of renters
              </Typography>
              <Divider />

              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder='Perfect getaway cabin...'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridEmail'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  size='lg'
                  as='textarea'
                  rows={3}
                  placeholder='Just the place for the perfect getaway...'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>Number Of Guests</Form.Label>
                  <Form.Control
                    type='number'
                    onChange={(e) => setNumOfGuests(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>Number Of Rooms</Form.Label>
                  <Form.Control
                    type='number'
                    onChange={(e) => setNumOfRooms(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>Number Of Beds</Form.Label>
                  <Form.Control
                    type='number'
                    onChange={(e) => setNumOfBeds(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId='formGridCity'>
                  <Form.Label>Number Of Baths</Form.Label>
                  <Form.Control
                    type='number'
                    onChange={(e) => setNumOfBaths(e.target.value)}
                  />
                </Form.Group>
              </Form.Row>

              <Typography variant='h5' className={classes.text}>
                Amenities
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                Really try to think of everything
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                Hold CTRL to select multiple
              </Typography>
              <Divider />

              <Form.Group controlId='exampleForm.ControlSelect2'>
                <Form.Label>Amenities</Form.Label>
                <Form.Control
                  as='select'
                  multiple
                  onChange={(e) =>
                    setAmenities(
                      [].slice
                        .call(e.target.selectedOptions)
                        .map((item) => item.value)
                    )
                  }
                >
                  <option>Washer & Dryer</option>
                  <option>Grill</option>
                  <option>Fire Pit</option>
                  <option>Air Conditioning</option>
                  <option>Pool</option>
                  <option>Pool Table</option>
                  <option>Microwave</option>
                  <option>Toaster</option>
                  <option>WiFi</option>
                  <option>Storage</option>
                  <option>Kitchen</option>
                  <option>Basement</option>
                  <option>Hangers</option>
                </Form.Control>
              </Form.Group>

              <Typography variant='h5' className={classes.text}>
                Set Price Per Night
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                This price is set by you and can be changed by you
              </Typography>
              <Divider />

              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Button variant='secondary' type='submit' block>
                NEXT, UPLOAD SOME IMAGES
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default Create;
