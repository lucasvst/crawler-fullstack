<template>
    <v-toolbar fixed app>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>

import moment from 'moment/src/moment'

export default {
  data () {
    return {
      title: moment(new Date()).format('dddd, D/MM/YY')
    }
  }
}
</script>
