<template>
  <v-app>
    <v-app-bar app color="green lighten-4" dense>
      <v-toolbar-title class="mr-3">Baum Engineering</v-toolbar-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        color="black"
        single-line
        hide-details
        class="shrink"
      ></v-text-field>
      <v-spacer />
      <v-menu offset-y v-if="$store.getters.isAuthenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">{{$store.state.user.name}}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title><span class="mr-2">Logout</span></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer height="auto">
      <v-layout justify-center>
        <v-flex teal darken-1--text text-xs-center>
          &copy;2020
          <strong>Baum</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
//import Login from '.views/Login.vue'
export default {
  name: "App",

  data: () => ({
  }),

  computed: {
    search: {
      get() {
        return this.$store.state.search;
      },

      set(value) {
        this.$store.commit('SEARCH', value);
      }
    }
  },

  methods: {
    logout() {
      this.$store.commit("USER", {});
      this.$router.push("Login");
    },
  },
};
</script>
