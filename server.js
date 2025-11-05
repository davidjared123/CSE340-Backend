/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const staticRoutes = require("./routes/static");

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT || 4000;
const host = process.env.HOST || "localhost";

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root

/* ***********************
 * Routes
 *************************/
app.use("/", staticRoutes);
// Index Route
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

/* ***********************
 * Database Connection Test
 *************************/

const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if(err){
    console.error('Error conectando a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos:', res.rows[0]);
  }
});

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
});

