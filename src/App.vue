<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title>URL管理＆簡単コピペツール</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer>フッター</v-footer>
  </v-app>
</template>

<style lang="scss"></style>
