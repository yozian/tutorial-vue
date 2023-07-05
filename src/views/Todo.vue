<template>
  <v-container align="center">
    <v-row>
      <v-col auto>
        <v-form @submit.prevent ref="form">
          <v-text-field v-model="todo.title" label="待辦事項" :rules="rules.title"></v-text-field>
          <v-btn type="submit" color="red-darken-1" @click="createTodoAsync">新增</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-list lines="one">
          <v-list-item v-for="item in todos" :key="item.id">
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="item.completed"></v-checkbox-btn>
              </v-list-item-action>
            </template>

            <v-list-item-title :style="{'color': item.completed ? 'gray':'blue'}">
              {{ item.title }}
            </v-list-item-title>

            <template v-slot:append>
              edit
            </template>

          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-overlay v-model="overlay" location-strategy="connected" scroll-strategy="block" contained
      class="align-center justify-center">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>


<script>
import { TodoApi } from '@/apis';

export default {
  data() {
    return {
      overlay:false,
      todo:{
        title: '',
        completed: false,
      },
      todos: [],
      rules:{
        title:[
          value => {
          if (value) return true

          return 'title is requred.'
        },
        ]
      }
    };
  },

  async mounted() {
  await this.fetchAllAsync();
  },
  methods:{
    async fetchAllAsync(){
    const res = await TodoApi.fetchAllAsync();
    this.todos = res.data;
  },
  async createTodoAsync(){
    //
    await this.exxecuteAsync(async () => {
      await this.validateAsync();
    
      const request = Object.assign({}, this.todo);
      
      const res = await TodoApi.createAsync(request);
      
      if(res.status !== 200){
        throw new Error('新增失敗');
      }
      
      //
      await this.fetchAllAsync();
    });
    
    
  },
  async validateAsync(){
    const form = this.$refs.form;
    const {valid} = await form.validate();
     if(!valid){
          throw new Error('驗證失敗');
      }
  },
  async exxecuteAsync(fn){
    try{
      this.overlay = true;
      await new Promise((resolve) => setTimeout(resolve, 500));
      await fn();
    }
    finally{
      this.overlay = false;
    }
  }
  
  }
  
}
</script>

<style scoped>
</style>
