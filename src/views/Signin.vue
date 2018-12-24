<template>
  <div class="signin">
    <h2>ログイン</h2>
    <div class="item">
      <label for="email">メールアドレス</label>
      <input type="text" id="email" placeholder="メールアドレスを入力" v-model="email">
    </div>
    <div class="item">
      <label for="password">パスワード</label>
      <input type="password" id="password" placeholder="パスワードを入力" v-model="password">
    </div>
    <button v-on:click="signIn">ログイン</button>
    <p>
      まだアカウントを持っていないなら
      <router-link to="/signup">アカウントを作成</router-link>
      しよう！
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          alert('Success' + user.user.email)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  }
}
</script>
