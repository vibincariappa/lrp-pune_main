require('dotenv').config();
const prisma = require('../config/db');

async function main(){
  try{
    const c = await prisma.admin.count();
    console.log('admin count:', c);
  }catch(e){
    console.error('verify error:', e.message);
    process.exit(1);
  }finally{
    await prisma.$disconnect();
  }
}

main();
