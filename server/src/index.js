const app = require('./app');

const port = process.env.PORT;
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
