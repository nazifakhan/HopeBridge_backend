import User from "../models/User.js";
import Draw from "../models/Draw.js";
import Score from "../models/Score.js";

export async function getAdminDashboard(req, res, next) {
  try {
    const [activeSubscribers, latestDraw, totalScores] = await Promise.all([
      User.countDocuments({ subscriptionStatus: "active" }),
      Draw.findOne().sort({ createdAt: -1 }),
      Score.countDocuments(),
    ]);

    res.json({
      activeSubscribers,
      latestDraw,
      totalScores,
    });
  } catch (error) {
    next(error);
  }
}
