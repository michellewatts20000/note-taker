const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

// listening on port 8080
app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });
  