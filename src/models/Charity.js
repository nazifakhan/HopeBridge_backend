import mongoose from "mongoose";
const charitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  description: String,
  imageUrl: String,
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Charity", charitySchema);