import {
 useQuery
}
from
"@tanstack/react-query";

import {
 getDashboard
}
from
"../service/dashboardService";

export const useDashboard =
()=>{

 return useQuery({

  queryKey:[
   "dashboard"
  ],

  queryFn:
  getDashboard

 });

};