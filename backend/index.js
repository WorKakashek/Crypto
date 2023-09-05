import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { pushCrypto } from "./controlers/postControler.js";
//------------------------------------------------------------------------------------------
mongoose
  .connect(
    "mongodb+srv://admin:5Yr7XkZy7xBRDnCt@cluster0.2gjmoxo.mongodb.net/crypto?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log(err);
  });
//------------------------------------------------------------------------------------------
const app = express();
app.use(cors());
app.use(express.json());
//------------------------------------------------------------------------------------------
app.post("/push", pushCrypto);
//------------------------------------------------------------------------------------------
app.listen(5000, () => {
  console.log("server start");
});
