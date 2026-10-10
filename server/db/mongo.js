import mongoose from "mongoose";

const clientOptions = {
  dbName: "Russell_Catways"
};


export const initClientDbConnection = async () => {
  try {
    if (!process.env.URL_MONGO) {
      throw new Error("fichier.env non trouvé");
    }
    await mongoose.connect(process.env.URL_MONGO, clientOptions);


  } catch (error) {
    console.error(error.message);
    throw error;
  }
};