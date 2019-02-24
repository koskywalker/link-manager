<template>
  <div>
    <v-toolbar
      color="teal
      accent-4"
      dark
      app
      fixed
    >
      <v-text-field
        flat
        solo-inverted
        autofocus
        prepend-inner-icon="search"
        label="Search"
        class="mt-2 mr-4"
        v-model="search"
        ref="searchField"
      ></v-text-field>
      <create-item
        @dialog-value-event="searchField_setFocus"
      ></create-item>
      <v-btn
        flat
        class="font-weight-bold"
        @click="signOut"
        tabindex="-1"
      >ログアウト</v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from 'firebase'
import CreateItem from '@/components/CreateItem'

export default {
  name: 'HeaderArea',
  components: {
    CreateItem
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    signOut() {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    searchField_setFocus() {
      this.$nextTick(this.$refs.searchField.focus)
    }
  },
  watch: {
    search() {
      this.$emit('search-value-event', this.search)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme--dark.v-text-field--solo-inverted.v-text-field--solo.v-input--is-focused>.v-input__control>.v-input__slot input {
  color: rgba(0, 0, 0, .3);
}
</style>
