const app = require('../app');
// use global fetch available in Node 18+
const fetch = global.fetch;

const server = app.listen(5001, async () => {
  console.log('Temp server started on 5001');
  try {
    const res = await fetch('http://localhost:5001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'x@x.com', password: 'pwd' })
    });
    console.log('STATUS', res.status);
    const text = await res.text();
    console.log(text);
  } catch (e) {
    console.error('ERR', e);
  } finally {
    server.close(() => console.log('Temp server stopped'));
  }
});