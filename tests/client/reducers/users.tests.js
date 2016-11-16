import expect from 'expect';
import { users } from '../../../client/reducers/users';
import * as constants from '../../../client/constants';

const initialState = {
  loading: false,
  error: null,
  records: [],
  total: 0,
  fetchQuery: null,
  searchBarValue: null,
  searchBarOptionValue: null
};

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(
      users(undefined, {}).toJSON()
    ).toEqual(
      initialState
    );
  });

  it('should handle FETCH_USERS_PENDING', () => {
    expect(
      users(initialState, {
        type: constants.FETCH_USERS_PENDING,
        meta: {
          page: 0
        }
      }).toJSON()
    ).toEqual(
      {
        loading: true,
        error: null,
        records: [],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle FETCH_USERS_PENDING', () => {
    expect(
      users({
        loading: false,
        error: null,
        records: [ 1, 2 ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.FETCH_USERS_PENDING,
        meta: {
          page: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: true,
        error: null,
        records: [ 1, 2 ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle FETCH_USERS_REJECTED', () => {
    expect(
      users(initialState, {
        type: constants.FETCH_USERS_REJECTED,
        errorMessage: 'ERROR'
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: 'An error occured while loading the users: ERROR',
        records: [],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle FETCH_USERS_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.FETCH_USERS_FULFILLED,
        payload: {
          data: {
            total: 100,
            users: []
          }
        },
        meta: {
          page: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [],
        total: 100,
        nextPage: 2,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle FETCH_USERS_FULFILLED', () => {
    expect(
      users(initialState, {
        type: constants.FETCH_USERS_FULFILLED,
        payload: {
          data: {
            total: 100,
            users: []
          },
          config: {
            params: {
              q: 'test'
            }
          }
        },
        meta: {
          page: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [],
        total: 100,
        nextPage: 2,
        fetchQuery: 'test',
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle RESET_FETCH_USERS', () => {
    expect(
      users({
        loading: false,
        error: null,
        records: [ 1, 2 ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.RESET_FETCH_USERS,
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle BLOCK_USER_FULFILLED', () => {
    expect(
      users({
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: false
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.BLOCK_USER_FULFILLED,
        meta: {
          userId: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: true
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle UNBLOCK_USER_FULFILLED', () => {
    expect(
      users({
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: true
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.UNBLOCK_USER_FULFILLED,
        meta: {
          userId: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: false
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle REMOVE_MULTIFACTOR_FULFILLED', () => {
    expect(
      users({
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: true,
            multifactor: []
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.REMOVE_MULTIFACTOR_FULFILLED,
        meta: {
          userId: 1
        }
      }).toJSON()
    ).toEqual(
      {
        loading: false,
        error: null,
        records: [
          {
            user_id: 1,
            blocked: true,
            multifactor: []
          }
        ],
        total: 0,
        fetchQuery: null,
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });

  it('should handle SAVE_SEARCHBAR_USERS', () => {
    expect(
      users({
        searchBarValue: null,
        searchBarOptionValue: null
      }, {
        type: constants.SAVE_SEARCHBAR_USERS,
        meta: {
          searchBarValue: 'test',
          searchBarOptionValue: 'email'
        }
      }).toJSON()
    ).toEqual(
      {
        searchBarValue: 'test',
        searchBarOptionValue: 'email'
      }
    );
  });

  it('should handle CLEAN_SEARCHBAR_USERS', () => {
    expect(
      users({
        searchBarValue: 'test',
        searchBarOptionValue: 'email'
      }, {
        type: constants.CLEAN_SEARCHBAR_USERS
      }).toJSON()
    ).toEqual(
      {
        searchBarValue: null,
        searchBarOptionValue: null
      }
    );
  });
});
