import mongoose from "mongoose";
const drawSchema = new mongoose.Schema({
  month: { type: String, required: true },
  numbers: [{ type: Number, min: 1, max: 45 }],
  method: { type: String, enum: ["random", "algorithmic"], default: "random" },
  status: { type: String, enum: ["draft", "published"], default: "draft" },
  prizePool: { type: Number, default: 0 },
  winners: [{ user: mongoose.Schema.Types.ObjectId, matchType: String, amount: Number, proofUrl: String, payoutStatus: { type: String, default: "pending" } }]
}, { timestamps: true });
export default mongoose.model("Draw", drawSchema);