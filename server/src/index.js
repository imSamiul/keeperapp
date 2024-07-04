const app = require('./app');

const port = process.env.PORT;

app.listen(port, '192.168.31.207', () => {
  console.log(`Server is up on port ${port}`);
});
