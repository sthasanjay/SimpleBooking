const express = require("express");
const app = express();

const user = require(".//routes/userRoutes")
const product = require("./routes/productRoutes")
const errorMiddleware = require("./middleware/error")

// routers

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/api/v1", user)
app.use("/api/v1",product)

//middleware for errors
app.use(errorMiddleware)
module.exports = app;