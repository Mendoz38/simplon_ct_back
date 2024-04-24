import mongoose from "mongoose";

const constantSchema = new mongoose.Schema(
  {
  start_time: Number,
  duration: Number,
  email: String,
  end_time: Number,
  pont: Number,
},
{ collection: "constant"}
);

const constantDB = mongoose.model("constant", constantSchema);

export default constantDB;
