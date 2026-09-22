import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ["subscriber", "admin"], default: "subscriber" },
  plan: { type: String, enum: ["monthly", "yearly"], default: "monthly" },
  charity: { type: mongoose.Schema.Types.ObjectId, ref: "Charity", default: null },
  contributionPercent: { type: Number, default: 10, min: 10, max: 100 },
  subscriptionStatus: { type: String, enum: ["active", "inactive"], default: "active" },
  renewalDate: { type: Date, default: () => new Date(Date.now() + 30 * 86400000) }
}, { timestamps: true });
export default mongoose.model("User", userSchema);