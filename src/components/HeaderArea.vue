<template>
  <div>
    <v-toolbar
      color="teal accent-4"
      dark
      app
      fixed
    >
      <v-toolbar-side-icon
        class="mr-4 ml-1"
        v-on:click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-text-field
        flat
        solo-inverted
        autofocus
        prepend-inner-icon="search"
        label="Search"
        class="mt-2"
        v-model="search"
      ></v-text-field>
      <!-- <v-spacer></v-spacer> -->
      <v-btn
        flat
        class="font-weight-bold"
        v-on:click="signOut"
      >
        ログアウト
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>John Leider</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <v-list-tile v-for="item in items" :key="item.title">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'HeaderArea',
  data() {
    return {
      drawer: null,
      search: '',
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
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
    }
  },
  watch: {
    search() {
      this.$emit('search-value-event', this.search)
    }
  }
}
</script>

<style lang="scss" scoped></style>
