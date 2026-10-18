import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Reservation = new Schema({
  catwayNumber: {
    type: Number,
    required: [true, "the number is required"]
  },

  clientName: {
    type: String,
    required: [true, "the client's name  is required"]
  },
  boatName: {
    type: String,
    required: [true, "the boat's name  is required"]
  },
  startDate: {
    type: Date,
    required: [true, "the start date is required"]
  },
  endDate: {
    type: Date,
    required: [true, "the end date is required"]
  }
},
  {
    timestamps: true
  });

Reservation.index(
  { catwayNumber: 1, startDate: 1, endDate: 1 }
);

export default mongoose.model("Reservation", Reservation);