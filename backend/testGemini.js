require("dotenv").config();

const aiService =
require("./src/services/aiService");

(async()=>{

const result =
await aiService.extractMetrics(

`
Pillar 1

Households Supported: 1200

Schools Supported: 35

Students Benefitted: 500
`

);

console.log(result);

})();