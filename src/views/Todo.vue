<template>
  <v-container align="center">
    <v-row>
      <v-col auto>
        <v-form @submit.prevent ref="form">
          <v-text-field v-model="todo.title" label="待辦事項" :rules="rules.title"></v-text-field>
          <v-btn type="submit" color="primary" @click="createTodoAsync">新增</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <v-col auto>
        <v-list lines="one">
          <v-list-item v-for="item in todos" :key="item.id">
            <template v-slot:prepend>
              <v-list-item-action start>
                <v-checkbox-btn v-model="item.completed" @update:model-value="updateStateAsync($event, item)"></v-checkbox-btn>
              </v-list-item-action>
            </template>

            <v-list-item-title :style="{'color': item.completed ? 'gray':'blue'}">
              <span v-if="!item.editting">
                {{ item.title }}
              </span>
              <div v-else>
                <v-text-field v-model="item.title" label="待辦事項" :rules="rules.title">
                  <template v-slot:append>
                    <v-btn color="primary" @click="updateTodoAsync(item)">儲存</v-btn>
                    <v-btn @click="cancelEditTodo(item)">取消</v-btn>
                  </template>
                </v-text-field>
              </div>
            </v-list-item-title>

            <template v-slot:append>
              <v-btn rounded flat :to="{name: 'TodoEdit', params:{'id': item.id}}">
                <v-icon color="black" >mdi-pencil</v-icon>
              </v-btn>
              <v-btn rounded flat>
                <v-icon color="blue" @click="editTodo(item)">mdi-pencil</v-icon>
              </v-btn>
              <v-btn rounded flat>
                <v-icon color="red" @click="confirmDelete(item)">mdi-delete</v-icon>
              </v-btn>
            </template>

          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-overlay v-model="overlay" location-strategy="connected" scroll-strategy="block" contained
      class="align-center justify-center">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text>
          請確認是否要刪除: {{toBeDeletedTodo.title}} ?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="deleteTotoAsync">確定</v-btn>
          <v-btn color="infomation" @click="dialog = false">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import { TodoApi } from '@/apis';

export default {
  data() {
    return {
      overlay:false,
      dialog:false,
      todo:{
        title: '',
        completed: false,
        editting:false
      },
      todos: [],
      toBeDeletedTodo:{},
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
      this.todos = res.data.map((item) => {
        item.editting = false;
        return item;
      });
    },
  async createTodoAsync(){
    //
    await this.executeAsync(async () => {
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
  confirmDelete(item){
    
    this.toBeDeletedTodo = item;
    
    this.dialog = true;
    
  },
  
  async deleteTotoAsync(){
    //
    
      await this.executeAsync(async () => {
      const res = await TodoApi.deleteAsync(this.toBeDeletedTodo.id);
      
      if(res.status !== 200){
        throw new Error('刪除失敗');
      }
      
      this.dialog = false;
      
      alert("已成功刪除");
      
      await this.fetchAllAsync();
      
    });
    
  },
  editTodo(item){
    item.editting = true;
  },
  
  async updateTodoAsync(item){
    //
     await this.executeAsync(async () => {
      const res = await TodoApi.updateAsync(item);
      
       if(res.status !== 200){
        throw new Error('更新失敗');
      }
      
        item.editting = false;
     })
  },
  cancelEditTodo(item){
    item.editting = false;
  },
  
  async validateAsync(){
    const form = this.$refs.form;
    const {valid} = await form.validate();
     if(!valid){
          throw new Error('驗證失敗');
      }
  },
  async updateStateAsync(e, item){
    //
    await this.executeAsync(async () => {
      const res = await TodoApi.updateAsync(item);
      
       if(res.status !== 200){
        throw new Error('更新失敗');
      }
      
      await this.fetchAllAsync();
      
     })
    
  },
  
  async executeAsync(fn){
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
