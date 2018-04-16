<template>

  <div>
    <v-layout class="mb-3">
      <v-spacer></v-spacer>
      <v-text-field
        label="busque por palavras chave"
        single-line
        :prepend-icon="'search'"
        hint="(p.ex: porto, turismo, gastronomia, etc)"
        persistent-hint
        v-model="search"
        v-on:keyup="searchUsers"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-layout>
    <v-data-table
        v-bind:headers="headers"
        :items="items"
        hide-actions
        class="elevation-1"
      >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }} </td>
        <td>{{ props.item.origin }} </td>
        <td>{{ props.item.category }} </td>
        <td>{{ props.item.title }} </td>
        <td>{{ props.item.excerpt }} </td>
        <td>{{ props.item.url }} </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Vue from 'vue'

import API from './../env/api';
import http from './services/Http'
import debounce from './services/Debounce'

const listService = query => {
  return http.get(`${API.paths.ARTICLES}?search=${query.search}`)
}

export default {
  mounted () {
    this.fetchUsers(this.search)
  },
  data () {
    return {
      headers: [
        {
          text: 'Data',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        {
          text: 'Veículo',
          align: 'left',
          sortable: true,
          value: 'origin'
        },
        {
          text: 'Categoria',
          align: 'left',
          sortable: true,
          value: 'category'
        },
        {
          text: 'Título',
          align: 'left',
          sortable: true,
          value: 'title'
        },
        {
            text: 'Trecho',
            align: 'left',
            sortable: true,
            value: 'excerpt'
        },
        {
          text: 'Url',
          align: 'left',
          sortable: true,
          value: 'url'
        }
      ],
      items: [],
      search: '',
    }
  },
  methods: {
    searchUsers: debounce(function() { this.fetchUsers(this.search) }, 250),
    fetchUsers (search) {
        listService({search})
          .then(response => response.data)
          .then(items => {
            Vue.set(this, 'items', items)
          })
    }
  }
}
</script>