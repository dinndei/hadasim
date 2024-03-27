import express from "express";
import { config } from "dotenv";
import { connectToDB } from './config/dbConfig.js';
import cors from "cors";
import clientRouter from "./routes/clientRoutes.js";
config();
connectToDB();
const app = express();
app.use(cors());
app.use(express.json())
app.use("/cl",clientRouter)
let port = process.env.PORT || 5000;
app.listen(port, console.log(`app is listening on port ${port}`));


const errorHandling = ((err, req, res, next) => {
    res.status(err.status || 500);
    res.send("errorHandler got an error" || err.message);
})

app.use(errorHandling);