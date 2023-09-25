const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const Route = require("./routes/Route.js");

const app = express()
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use(express.static("public"))
app.use(Route) 

app.listen(PORT,() => console.log(`serve berjalan di http://localhost:${PORT}`))