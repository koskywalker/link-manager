<template>
  <v-app id="inspire" class="main-wrap">
    <router-view/>
  </v-app>
</template>

<style>
a {
  color: #00bfa5 !important;
  text-decoration: none;
}

a:hover {
  opacity: 0.8;
}

.main-wrap {
  min-height: initial;
  max-height: 100%;
  max-width: 800px;
}

.main-wrap .application--wrap {
  min-height: initial;
}

.application .primary--text {
  color: #00bfa5 !important;
  caret-color: #00bfa5 !important;
}

.v-messages__message {
  margin-top: 5px;
}

.form-btn .v-btn {
  display: block;
  font-weight: bold;
  margin: 20px auto 0;
  width: 60%;
}
</style>
