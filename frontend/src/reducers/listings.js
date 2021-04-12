import {
  GET_LISTINGS,
  GET_LISTING,
  CREATE_LISTING,
  CLEAR_LISTINGS,
} from '../actions/types';

const initialState = {
  listings: [],
  isLoading: true, //ignore this for now never use it
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LISTINGS:
      return {
        ...state,
        listings: action.payload,
        isLoading: false,
      };
    case GET_LISTING:
      return {
        ...state,
        listings: action.payload,
        isLoading: false,
      };
    case CREATE_LISTING:
      return {
        ...state,
        listings: action.payload,
      };
    case CLEAR_LISTINGS:
      return {
        ...state,
        listings: [],
      };
    default:
      return state;
  }
}
