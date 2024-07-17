const express = require('express');
const app = express();
const port = 3000;

const obatRoute = require('./routes/obatRoute');

// Gunakan rute dengan prefix /api
app.use('/', obatRoute);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
