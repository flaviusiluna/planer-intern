<template>
  <v-card class="grey lighten-3 mx-auto">
    <v-card-title class="pa-0">
      <v-toolbar color="teal lighten-1" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>        
      </v-toolbar>
    </v-card-title>

    <v-card-text>
      <task
        v-for="(task, i) in tasks"
        :key="i"
        class="my-3"
        :task="task"
      />
    </v-card-text>
  </v-card>
</template>

<script>
import Task from "./Task";

export default {
  components: { Task },
  props: ["title", "tasks"],

  data: () => ({
    
  }),

  methods: {
    
  }
};
</script>