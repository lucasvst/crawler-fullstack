<template>
  <v-form v-model="valid">
    <v-text-field
      label="Username"
      v-model="username"
      :rules="usernameRules"
      :counter="10"
      required
    ></v-text-field>
    <v-text-field
      label="Password"
      v-model="password"
      :rules="passwordRules"
      required
    ></v-text-field>
    <v-btn
      @click="handleSubmit"
      :disabled="!valid"
    >Entrar</v-btn>
  </v-form>
</template>

<script>
export default {
    name: 'login',
    data () {
      return {
        valid: false,
        username: '',
        usernameRules: [
          (v) => !!v || 'Nome de usuário é obrigatório!',
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'Senha é obrigatória!',
        ]
    }
},
  methods: {
    handleSubmit: function () {
        console.log(this.username)
    }
  }
}
</script>