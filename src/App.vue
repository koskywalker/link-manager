<template>
  <v-app>
    <header-area></header-area>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <footer-area></footer-area>
  </v-app>
</template>

<script>
import HeaderArea from '@/components/HeaderArea'
import FooterArea from '@/components/FooterArea'

export default {
  components: {
    HeaderArea,
    FooterArea,
  }
}
</script>


<style lang="scss"></style>
