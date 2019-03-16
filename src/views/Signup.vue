<template>
  <div class="signup">
    <h2>アカウント登録</h2>
    <form @submit.prevent="signUp">
      <div class="item">
        <label for="email">メールアドレス</label>
        <input type="text" id="email" placeholder="メールアドレスを入力" v-model="email">
      </div>
      <div class="item">
        <label for="password">パスワード</label>
        <input type="password" id="password" placeholder="パスワードを入力" v-model="password">
      </div>
      <button type="submit">登録</button>
    </form>
    <p>すでにアカウントをお持ちの場合は
      <router-link to="/signin">ログインしよう！</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(
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
