<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-card hover ripple v-bind="attrs" v-on="on" class="my-4">
        <v-card-title>
          <span class="title font-weight-light">{{task.title}}</span>
          <v-spacer></v-spacer>
          <v-icon
            :color="task.status === 'done' ? 'green' : 'orange'"
          >{{task.status === 'done' ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
          <v-btn icon color="red" @click.stop="deleteTask()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">"{{task.text}}"</v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{user}}</v-list-item-title>
            </v-list-item-content>

            <v-row align="center" justify="end"><span class="font-weight-bold mr-1">Due date:</span>{{formatDate(task.dueDate)}}</v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2">Update Task</v-card-title>

      <v-card-text>
        <v-text-field v-model="editedTask.title" class="mt-6" label="Title" outlined></v-text-field>
        <v-textarea v-model="editedTask.text" outlined name="input-7-4" label="Task"></v-textarea>
        <v-menu
          v-model="createdDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="editedTask.createdDate"
              label="Created date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="editedTask.createdDate" @input="createdDate = false"></v-date-picker>
        </v-menu>

        <v-menu
          v-model="dueDate"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="editedTask.dueDate"
              label="Due Date"
              prepend-icon="mdi-calendar-range"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="editedTask.dueDate" @input="dueDate = false"></v-date-picker>
        </v-menu>

        <v-switch
          v-model="editedTask.status"
          :label="editedTask.status === 'done' ? 'Task is done' : 'Mark as done'"
          color="green darken-3"
          value="done"
          hide-details
        ></v-switch>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">Cancel</v-btn>
        <v-btn color="primary" @click.stop="updateTask()">Update</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

 
<script>
import moment from 'moment';

export default {
  props: ["task"],
  data() {
    return {
      selected: [],
      dialog: false,
      createdDate: false,
      dueDate: false,
      editedTask: { ...this.task },
    };
  },

  computed: {
    user() {
      return this.$store.state.users.find((user) => {
        return user.id === this.task.user;
      }).name;
    },
  },

  methods: {
    formatDate(date) {
      return moment(new Date(date)).format("MMM Do YY");
    },

    deleteTask() {
      this.$store.dispatch("DELETE_TASK", this.task);
    },
    updateTask() {
      this.$store.dispatch("UPDATE_TASK", { ...this.editedTask }).then(() => {
        this.dialog = false;
      });
    },
  },
};
</script>