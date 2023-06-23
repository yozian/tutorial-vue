import { MyAxios } from './axios';

export const TodoApi = {

  fetchAllAsync: async()=>{
    return MyAxios.get("/api/todo/todos")
  }

}

