require("dotenv").config();

const routes = ['adminRoutes', 'authRoutes', 'uploadRoutes', 'pillarRoutes'];

routes.forEach(r => {
  try {
    const rt = require(`../routes/${r}`);
    console.log(`${r}: type=${typeof rt}, isRouter=${typeof rt?.use === 'function'}, keys=${Object.keys(rt || {})}`);
  } catch(e) {
    console.log(`${r}: ERROR - ${e.message}`);
  }
});
