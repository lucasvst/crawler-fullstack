<template v-if="$route.matched.length">
  <v-app>
    <Toolbar></Toolbar>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <template v-if="$route.matched.length">
              <router-view></router-view>
            </template>
            <template v-else>
              <Login></Login>
            </template>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <v-spacer></v-spacer>
      <span><b>eclipping</b>.com.br &copy; 2018</span>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import List from './List'
import Toolbar from './Toolbar'

export default {
  components: {
    List,
    Toolbar
  },
}
</script>
