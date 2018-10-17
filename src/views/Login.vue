<template>
  <div class="home">
    <form class="login" @submit.prevent="login">
			<h1>Sign in</h1>
			<label>User name</label>
			<input required v-model="mail" type="text" placeholder="test@test.com"/>
			<label>Password</label>
			<input required v-model="password" type="password" placeholder="1234"/>
			<hr/>
			<button type="submit">Login</button>
		</form>
  </div>
</template>

<style>
  .login {
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 10px;
  }
</style>

<script>
  import {AUTH_REQUEST} from '../store/types'
  export default {
    name: 'login',
    data () {
      return {
        mail: '',
        password: '',
      }
    },
    methods: {
      login: function () {
        const { mail, password } = this
        this.$store.dispatch(AUTH_REQUEST, { mail, password }).then(() => {
          this.$router.push('/')
        })
      },
    },
  }
</script>