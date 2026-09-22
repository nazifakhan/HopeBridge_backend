import Score from "../models/Score.js";
import Draw from "../models/Draw.js";
export async function getDashboard(req, res, next) {
  try {
    const [scores, nextDraw] = await Promise.all([Score.find({ user: req.user._id }).sort({ date: -1 }).limit(5), Draw.findOne({ status: "published" }).sort({ createdAt: -1 })]);
    res.json({ user: req.user, scores, nextDraw, impact: { contribution: 4.28, charityName: "FairWays Foundation" }, winnings: { total: 0, paymentStatus: "pending" } });
  } catch (error) { next(error); }
}