import cryptoModel from "../DBmodels/cryptoModel.js";

export const pushCrypto = async (req, res) => {
  try {
    const crypto = req.body.cryptoName;
    const doc = new cryptoModel({
      cryptoName: crypto,
    });
    const savedCrypto = await doc.save();
    res.json("jnghfdktyj");
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "ошибка",
    });
  }
};
