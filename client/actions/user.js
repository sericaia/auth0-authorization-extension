import axios from 'axios';
import * as constants from '../constants';

import { fetchUserGroups, fetchUserNestedGroups } from './userGroup';

/*
 * Search for users.
 */
export function fetchUsers(q = '', field = '', reset = false, per_page, page, onSuccess) {
  return (dispatch, getState) => {
    const users = getState().users.get('records');
    if (reset || q !== '' || !users.size) {
      dispatch({
        type: constants.FETCH_USERS,
        payload: {
          promise: axios.get('/api/users', {
            params: {
              q,
              field,
              per_page,
              page
            },
            responseType: 'json'
          })
        },
        meta: {
          page,
          onSuccess
        }
      });
    }
  };
}

/*
 * Fetch the user details.
 */
export function fetchUserDetail(userId, onSuccess) {
  return {
    type: constants.FETCH_USER,
    meta: {
      userId,
      onSuccess
    },
    payload: {
      promise: axios.get(`/api/users/${userId}`, {
        responseType: 'json'
      })
    }
  };
}

/*
 * Fetch the complete user object.
 */
export function fetchUser(userId) {
  return (dispatch) => {
    dispatch(fetchUserDetail(userId));
    dispatch(fetchUserGroups(userId));
    dispatch(fetchUserNestedGroups(userId));
  };
}
