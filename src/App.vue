<template>
  <v-app id="inspire">
    <header-area></header-area>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HeaderArea from '@/components/HeaderArea'

export default {
  components: {
    HeaderArea,
  }
}
</script>


<style lang="scss"></style>
