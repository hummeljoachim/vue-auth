/* eslint no-unused-vars: 0 */

// Mutations

import Vue from 'vue';
import * as types from './types';

export default({
	[types.AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [types.AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp
    state.hasLoadedOnce = true
  },
  [types.AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [types.AUTH_LOGOUT]: (state) => {
    state.token = ''
  },
  [types.USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [types.USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [types.USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [types.SET_ANSWER]: (state, resp) => {
    state.answer = resp
  },
});
