const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const router = require('./routes');

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
