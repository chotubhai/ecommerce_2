var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  cart: [{ type: Schema.Types.ObjectId, ref: "productModel"}],
  orders: [{ type: Schema.Types.ObjectId, ref: "orderModel"}],
});

const orderSchema = new Schema({
  date: {
    type: Number,
    required: true,
  },
  status: {
    type: String, 
    enum: ["pending", "ordered","Delivered","cancelled"],
    required: true,
  },
  userId: {
    type:Schema.Types.ObjectId,
    required:true
  },
  txn: {
    type: Number,
    required: true,
  },
  productId: 
    [{type: Schema.Types.ObjectId,
    required: true,}]
  
});

const productSchema = new Schema({
  retailPrice: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  discountPrice: {
    type: String,
  },
  brand: {
    type: String,
  },
  categoriesTree: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  specifcation: {
    type: String,
  },
  productUrl: {
    type: String,
    required: true,
  },
});

const miscSchema = new Schema({
  categoriesCount: [
    {
      name: String,
      count: Number,
      image: String,
    },
  ],
  productCount: [
    {
      _id: Schema.Types.ObjectId,
      count: Number,
      image: String,
      name: String,
    },
  ]
});

const userModel = mongoose.model("userModel", userSchema);
const orderModel = mongoose.model("orderModel", orderSchema);
const productModel = mongoose.model("productModel", productSchema);
const miscModel = mongoose.model("miscModel", miscSchema);

module.exports = {
  userModel,
  orderModel,
  productModel,
  miscModel,
};
