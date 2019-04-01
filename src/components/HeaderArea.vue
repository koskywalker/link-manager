<template>
  <v-layout row>
    <v-flex xs8 offset-xs2>
      <v-toolbar color="teal accent-4" dark app fixed>
        <v-text-field
          flat
          solo-inverted
          autofocus
          prepend-inner-icon="search"
          label="Search"
          v-model="search"
          ref="searchField"
        ></v-text-field>
        <create-item @dialog-value-event="searchField_setFocus"></create-item>
        <v-btn flat class="font-weight-bold" @click="signOut" tabindex="-1">ログアウト</v-btn>
      </v-toolbar>
    </v-flex>
  </v-layout>
</template>

<script>
import firebase from 'firebase/app'
import CreateItem from '@/components/CreateItem'

export default {
  components: {
    CreateItem
  },

  data () {
    return {
      search: '',
    }
  },

  methods: {
    toHome () {
      this.$router.push('/')
    },

    signOut () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },

    searchField_setFocus () {
      this.$nextTick(this.$refs.searchField.focus)
    }
  },

  watch: {
    search () {
      this.$emit('search-value-event', this.search)
    }
  }
}
</script>

<style>
.v-toolbar .v-input {
  padding: 5px;
}

.v-input input {
  height: 100%;
  max-height: initial;
}

.theme--dark.v-text-field--solo-inverted.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  height: 100%;
}

.v-toolbar .v-text-field.v-text-field--solo .v-input__control {
  height: 40px;
  min-height: initial;
}

.v-input__control .v-input__slot {
  margin-bottom: 0;
}
</style>
