<template>
  <v-container align="center">
    <v-row>
      <v-col auto>
        <v-form @submit.prevent ref="form">
          <v-text-field v-model="todo.title" label="待辦事項"></v-text-field>
          <v-btn type="submit" color="primary" @click="updateTodoAsync">儲存</v-btn>
        </v-form>
        <v-btn :to="{name:'Todo'}">返回</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { TodoApi } from '@/apis';

export default {
  props:['id'],
  data() {
    return {
      todo:{}
    }
    
  },
  async  mounted() {
    console.log("route path id:"+this.id);
    
    console.log("router",this.$router);
    //
    console.log("route",this.$route);
    console.log("id from route",this.$route.params.id);
    
    await this.fetchAsync();
  },
  methods: {
    
    async fetchAsync(){
      //
      const id = this.id;
      //
      const res = await TodoApi.fetchOneAsync(id);
      //
      this.todo = res.data;
    },
    async updateTodoAsync(){
      //
      const req = Object.assign({}, this.todo);
      
      //
      const res = await TodoApi.updateAsync(req);
      //
      
      if(res.status !== 200){
        throw new Error('更新失敗');
      }
      
      this.$router.push({name:'Todo'});
    },
    
    goback(){
      this.$router.push({name:'Todo'});
    }
    
  
  }
    
  }
</script>
