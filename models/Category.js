import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 80
  },
  description: {
    type: String,
    required: true,
    unique: true,
    maxLength: 40
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default model("Category", categorySchema);
