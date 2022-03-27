require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const authControlar = require("./controlars/auth.controlars");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authControlar);

app.listen(process.env.BACKEND_PORT, async () => {
    try {
        await connect();
        console.log(`Server is working on ${process.env.BACKEND_PORT}`)
    } catch (e) {
        console.log(e.message);
    }
})

