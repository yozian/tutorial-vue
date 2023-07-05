import { MyAxios } from './axios';

const basePath = "/api/todo";

export const TodoApi = {

  fetchAllAsync: async()=>{
    return MyAxios.get(`${basePath}/todos`)
  },
  fetchOneAsync : async(id)=>{
    return MyAxios.get(`${basePath}/${id}`);
  },
  createAsync : async(req)=>{
    return MyAxios.post(`${basePath}/create`, req)
  },
  updateAsync : async(req)=>{
    return MyAxios.put(`${basePath}/update`, req)
  },
  deleteAsync : async(id)=>{
    return MyAxios.delete(`${basePath}/delete/${id}`);
  }
}
