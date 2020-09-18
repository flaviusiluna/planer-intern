<template>
  <v-layout row justify-center>
    <v-dialog v-model="open" scrollable="" max-width="60%">
      <v-card>
        <v-card-title>
          <span class="headline">Task title</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-form>
              <v-textarea
                outline
                v-model="note"
                label="Note"
                placeholder="Start writing yur note here"
              ></v-textarea>

              <v-btn color="success">Save</v-btn>
            </v-form>
          </v-container>

          <v-list three-line subheader>
            <v-subheader>Notes</v-subheader>

            <v-list-tile v-for="(note,key) in notes" v-bind:key="key">
              <v-list-tile-content>
                <v-list-tile-title>{{note.note }}</v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn mdi-delete>
                  <v-icon color="red">delete</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn flat  color="green">Close</v-btn>
            <v-spacer></v-spacer>
        <v-btn flat color="red">Remove Task</v-btn> 
        </v-card-actions>
        
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: "notesModal",
  data: () => ({
    note: "",
    open: true,
    notes: [
      {
        id: 1,
        note: "Some random note",
      },
      {
        id: 1,
        note: "Some random note",
      },
      {
        id: 1,
        note: "Some random note",
      },
    ],
  }),
};
</script>