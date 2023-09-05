import mongoose from "mongoose";
//Модель
const CryptoSchema = new mongoose.Schema(
  {
    cryptoName: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true, //Дата создания
  }
);

export default mongoose.model("Post", CryptoSchema);