import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
  price: {
    type: Number,
    required: true
  },
  stock_quantity: {
    type: Number,
    required: true
  },
  category_id: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  url_image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default model("Product", productSchema);
