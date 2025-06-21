import mongoose from "mongoose";

const BoothSchema = mongoose.Schema(
  {
    boothname: {
      type: String,
      required: [true, "pls enter booth"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    house: {
      type: String,
      enum: ["gryffindor", "ravenclaw", "slytherin", "hufflepuff"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Booth = mongoose.model("Booth", BoothSchema);
export default Booth;
