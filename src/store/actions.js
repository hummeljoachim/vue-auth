/* eslint no-unused-vars: 0 */

// Actions

import axios from 'axios';
import * as types from './types';
import state from './state';

const apiUrl = process.env.VUE_APP_API_PATH;

export default({

	// Login
	[types.AUTH_REQUEST]: ({commit, dispatch}, user) => {
		return new Promise((resolve, reject) => { // The Promise used for router redirect in login
			commit(types.AUTH_REQUEST)
			axios({url: apiUrl + 'auth/generate-token', data: user, method: 'POST' })
			.then(resp => {
				const token = 'Bearer ' + resp.data.token
				localStorage.setItem('token', token) // store the token in localstorage
				// Add the following line:
        axios.defaults.headers.common['Authorization'] = token
				commit(types.AUTH_SUCCESS, token)
				// you have your token, now log in your user :)
				resolve(resp)
			})
			.catch(err => {
				commit(types.AUTH_ERROR, err)
				localStorage.removeItem('token') // if the request fails, remove any possible user token if possible
				reject(err)
			})
		})
	},

	// Logout
	[types.AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(types.AUTH_LOGOUT)
      localStorage.removeItem('token') // clear your user's token from localstorage
      delete axios.defaults.headers.common['Authorization']
      resolve()
    })
  },

  // get page
	[types.GET_ANSWER]: ({commit, dispatch}, path) => {
		return new Promise((resolve, reject) => { // The Promise used for router redirect in login
			const token = state.token;
			if(token){
				axios.defaults.headers.common['Authorization'] = token
			}
			axios({url: apiUrl + path, method: 'GET'})
			.then(resp => {
				commit(types.SET_ANSWER, resp.data)
			})
			.catch(err => {
				reject(err)
				commit(types.SET_ANSWER, err.response.data)
			})
		})
  },

});
