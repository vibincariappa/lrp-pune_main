require('dotenv').config();
try{
  const prisma = require('../config/db');
  console.log('prisma loaded', typeof prisma);
  prisma.$disconnect().catch(()=>{});
}catch(e){
  console.error('prisma init error', e);
}
