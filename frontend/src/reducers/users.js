import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  GET_USER_INFO,
} from '../actions/types';

const initialState = {
  isAuth: localStorage.getItem('isAuth'),
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      const access = action.payload.accessToken;
      const refresh = action.payload.refreshToken;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      localStorage.setItem('isAuth', true);
      return {
        ...state,
        isAuth: true,
      };
    case GET_USER_INFO:
      return {
        ...state,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isAuth');
      return {
        ...state,
        user: {},
        isAuth: false,
      };
    default:
      return state;
  }
}
