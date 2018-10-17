<template>
  <div class="apitest">
    <h1>Api Test</h1>
    	<p>This Form calls an Endpoint from the API, using the token from the auth in the request header.</p>
		<form class="login" @submit.prevent="callApi">
			<label>api endpoint</label>
			<input required v-model="path" type="text" placeholder="path/to/endpoint"/>
			<button type="submit">call Api</button>
		</form>
		<h3>Answer:</h3>
		<p>{{answer}}</p>
		<form class="login" @submit.prevent="logout">
			<button type="submit">Logout</button>
		</form>
  </div>
</template>

<script>
import {GET_ANSWER, AUTH_LOGOUT} from '../store/types'
import { mapGetters } from 'vuex'

export default {
	name: 'apitest',
	computed: {
		...mapGetters([
			'answer'
		])
	},
	data () {
      return {
        path: '',
      }
    },
	methods: {
		callApi: function () {
			const { path } = this
			this.$store.dispatch(GET_ANSWER, path)
		},
		logout: function () {
			this.$store.dispatch(AUTH_LOGOUT)
			.then(() => {
				this.$router.push('/login')
			})
		},
	}
}
</script>