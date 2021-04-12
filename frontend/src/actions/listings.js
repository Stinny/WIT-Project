import axiosInstance from '../api';
import { GET_LISTINGS, GET_LISTING, CREATE_LISTING } from './types';

//gets all listings from server
export const getListings = () => (dispatch) => {
  axiosInstance
    .get('/listings')
    .then((res) => {
      dispatch({
        type: GET_LISTINGS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getListing = (listingId) => (dispatch) => {
  axiosInstance
    .get(`/listings/${listingId}`)
    .then((res) => {
      dispatch({
        type: GET_LISTING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const getUserListings = (dispatch) => {
  axiosInstance.get('/listings/userlistings').then((res) => {
    dispatch({
      type: GET_LISTINGS,
      payload: res.data,
    });
  });
};

//get a speciffic listing for detail
export const listingDetail = (listingId) => (dispatch) => {
  axiosInstance
    .get(`/listing/${listingId}`)
    .then((res) => {
      dispatch({
        type: GET_LISTING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//create a listing on our server
export const createListing = (listing) => (dispatch) => {
  axiosInstance
    .post('/listings/create', listing)
    .then((res) => {
      dispatch({
        type: CREATE_LISTING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
