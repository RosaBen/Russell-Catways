import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Catway = new Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1
  },
  catwayType: {
    type: String,
    required: true,
    enum: ["long", "short"]
  },
  catwayState: {
    type: String,
    default: "Bon état"
  }
},
  {
    timestamps: true
  }
);

export default mongoose.model("Catway", Catway);