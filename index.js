require('dotenv').config();
const express = require('express');
const router = require('./src/router');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();
const cors = require("cors");

app.use(express.json());
// Handler for API
app.use("/", router);
app.use(cors());
// Serving static files
app.use(express.static(path.join(__dirname, '../client/build')));

app.listen(port, () => console.log(`Express is running on port ${port}`));