<template>
  <div class="signin">
    <h2>ログイン</h2>
    <form @submit.prevent="signIn">
      <div class="item">
        <label for="email">メールアドレス</label>
        <input type="text" id="email" placeholder="メールアドレスを入力" v-model="email">
      </div>
      <div class="item">
        <label for="password">パスワード</label>
        <input type="password" id="password" placeholder="パスワードを入力" v-model="password">
      </div>
      <button type="submit">ログイン</button>
    </form>
    <p>まだアカウントを持っていないなら
      <router-link to="/signup">アカウントを作成</router-link>しよう！
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
      firebase.auth().signInWithEmailAndPassword(
        this.email,
        this.password
      )
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error.message)
        })
    }
  }
}
</script>
