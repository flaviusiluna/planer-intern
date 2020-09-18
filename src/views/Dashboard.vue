<template>
  <div style="max-height: 96.3vh; height: 100%">
    <v-container fluid fill-height>
      <v-layout row align-space-between justify-space-between>
        <v-col cols="4">
          <v-flex>
            <task-list :title="'Last Week'" :tasks="lastWeekTasks" />
          </v-flex>
        </v-col>
        <v-col cols="4">
          <v-flex>
            <task-list :title="'This Week'" :tasks="thisWeekTasks" />
          </v-flex>
        </v-col>
        <v-col cols="4">
          <v-flex>
            <task-list :title="'Future Tasks'" :tasks="futureTasks" />
          </v-flex>
        </v-col>
      </v-layout>
    </v-container>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="green" dark absolute bottom right fab class="mb-8">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">Add Task</v-card-title>

        <v-card-text>
          <v-text-field v-model="task.title" class="mt-6" label="Title" outlined></v-text-field>
          <v-textarea v-model="task.text" outlined name="input-7-4" label="Task"></v-textarea>
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="task.date"
                label="Picker without buttons"
                prepend-icon="mdi-calendar-range"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="task.date" @input="menu2 = false"></v-date-picker>
          </v-menu>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="primary" @click.stop="createTask">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import TaskList from "../components/TaskList";
import moment from "moment";
export default {
  name: "todo",

  components: { TaskList },
  data() {
    return {
      task: {
        title: "",
        date: new Date().toISOString().substr(0, 10),
        text: "",
        status: "inProgres",
      },

      dialog: false,
      menu2: false,
    };
  },

  computed: {
    tasks() {
      return this.$store.state.tasks.filter((task) => {
        if (this.$store.state.user.role === 'admin') {
          return task.text.toUpperCase().includes(this.$store.state.search.toUpperCase());
        } else {
          return task.user === this.$store.state.user.id && task.text.toUpperCase().includes(this.$store.state.search.toUpperCase());
        }
        
      });
    },
    lastWeekTasks() {
      return this.tasks.filter((task) => {
        const thisWeek = moment().week();
        if (moment(new Date(task.date)).week() < thisWeek) {
          return task;
        }
      });
    },
    thisWeekTasks() {
      return this.tasks.filter((task) => {
        const thisWeek = moment().week();
        if (moment(new Date(task.date)).week() === thisWeek) {
          return task;
        }
      });
    },
    futureTasks() {
      return this.tasks.filter((task) => {
        const thisWeek = moment().week();
        if (moment(new Date(task.date)).week() > thisWeek) {
          return task;
        }
      });
    },
  },

  methods: {
    initTask() {
      this.task = {
        title: "",
        date: new Date().toISOString().substr(0, 10),
        text: "",
        status: "inProgres",
      };
    },
    createTask() {
      this.$store.dispatch("ADD_TASK", { ...this.task }).then(() => {
        this.dialog = false;
        this.initTask();
      });
    },
  },
};
</script>