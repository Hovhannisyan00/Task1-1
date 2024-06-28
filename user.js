const express = require("express");
const fs = require("fs");
const app = express();
const body_parser = require("body-parser");
app.use(body_parser.json());