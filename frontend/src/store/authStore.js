import { create }
from "zustand";

const useAuthStore =
create((set)=>({

 accessToken:null,

 setToken:(token)=>
 set({

  accessToken:token

 }),

 logout:()=>
 set({

  accessToken:null

 })

}));

export default
useAuthStore;