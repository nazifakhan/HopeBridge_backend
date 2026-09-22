import Charity from "../models/Charity.js";
import Draw from "../models/Draw.js";
import Score from "../models/Score.js";
import User from "../models/User.js";

export async function getAdminOverview(req, res, next) {
  try {
    const [activeSubscribers, charityCount, totalScores, latestDraw] =
      await Promise.all([
        User.countDocuments({ subscriptionStatus: "active" }),
        Charity.countDocuments({ isActive: true }),
        Score.countDocuments(),
        Draw.findOne().sort({ createdAt: -1 }).populate("winners.user", "name email"),
      ]);

    const impact = await User.aggregate([
      { $match: { subscriptionStatus: "active" } },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: [
                { $cond: [{ $eq: ["$plan", "yearly"] }, 99, 9.99] },
                { $divide: ["$contributionPercent", 100] },
              ],
            },
          },
        },
      },
    ]);

    res.json({
      stats: {
        activeSubscribers,
        charityCount,
        totalScores,
        charityImpact: impact[0]?.total || 0,
      },
      draw: latestDraw,
      winners: latestDraw?.winners || [],
    });
  } catch (error) {
    next(error);
  }
}
