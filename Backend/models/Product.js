import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },

    // Change here: allow multiple URLs
    image: {
  type: [String],
  required: false,
  default:[]
},

    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: [String], default: [] },

    bestseller: { type: Boolean, default: false },

    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
