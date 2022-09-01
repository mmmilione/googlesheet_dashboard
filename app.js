const express = require("express");
const router = require('./routes/router');
const connect = require('./db/mongo');
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(router);
connect(app);
