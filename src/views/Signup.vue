<template>
  <v-layout justify-center>
    <v-flex xs12 class="pa-5">
      <v-card>
        <v-card-text class="pt-5 px-5">
          <h2>アカウント登録</h2>
          <v-form @submit.prevent="signUp">
            <v-text-field
              prepend-icon="email"
              v-model="email"
              :rules="[rules.required, rules.email]"
              label="メールアドレス"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              v-model="password"
              :rules="[rules.required]"
              :type="'password'"
              label="パスワード"
              validate-on-blur
            ></v-text-field>
            <v-text-field
              v-model="passwordVerify"
              :rules="[rules.required]"
              :type="'password'"
              ref="passwordVerify"
              label="パスワード確認"
              validate-on-blur
              style="margin-left: 33px;"
            ></v-text-field>
            <v-flex class="form-btn">
              <v-btn type="submit" color="teal accent-4" dark>登録</v-btn>
            </v-flex>
          </v-form>
        </v-card-text>
        <v-divider class="mt-3"></v-divider>
        <v-card-actions class="pa-3">
          <p class="ml-auto">
            すでにアカウントを持ってるなら
            <router-link to="/signin">ログイン</router-link>しよう！
          </p>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'

export default {
  data () {
    return {
      email: '',
      password: '',
      passwordVerify: '',
      rules: {
        required: value => !!value || '必須項目です。',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '正しい形式ではありません。'
        }
      }
    }
  },
  methods: {
    signUp () {
      if (this.password === this.passwordVerify) {
        firebase.auth().createUserWithEmailAndPassword(
          this.email,
          this.password
        )
          .then(() => {
            const user = firebase.auth().currentUser;

            user.sendEmailVerification().then(() => {
              this.$router.push('/mailverify')
            }).catch((error) => {
              alert(error)
            });
            // this.$router.push('/')
          })
          .catch((error) => {
            alert(error.message)
          })
      } else {
        alert('パスワードが一致していません。')
        this.$refs.passwordVerify.focus()
      }
    }
  }
}
</script>
