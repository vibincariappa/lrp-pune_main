import apiClient
from "./apiClient";

export const login =
(data)=>{

 return apiClient.post(

  "/auth/login",

  data

 );

};