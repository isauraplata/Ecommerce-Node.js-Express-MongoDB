// import mongoose from "mongoose";

// const { Schema } = mongoose;

// const shoppingCartSchema = new Schema({
//   user_id: {
//     type: Schema.Types.ObjectId,
//     ref: "User", 
//     required: true
//   },
//   product_id: {
//     type: Schema.Types.ObjectId,
//     ref: "Product", 
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   }
// });

// const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

// export default ShoppingCart;




import mongoose from "mongoose";

const { Schema } = mongoose;

const shoppingCartSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
  products: [{
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product", 
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});



const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

export default ShoppingCart;