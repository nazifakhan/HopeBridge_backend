import Score from "../models/Score.js";

export async function getScores(req, res, next) {
  try { res.json(await Score.find({ user: req.user._id }).sort({ date: -1 }).limit(5)); } catch (error) { next(error); }
}

export async function createScore(req, res, next) {
  try {
    const { date, value } = req.body;
    if (!date || value < 1 || value > 45) return res.status(400).json({ message: "A date and Stableford value from 1 to 45 are required" });
    const score = await Score.findOneAndUpdate({ user: req.user._id, date: new Date(date) }, { value }, { new: true, upsert: true, setDefaultsOnInsert: true });
    const allScores = await Score.find({ user: req.user._id }).sort({ date: -1 });
    if (allScores.length > 5) await Score.deleteMany({ _id: { $in: allScores.slice(5).map((item) => item._id) } });
    res.status(201).json(score);
  } catch (error) { next(error); }
}

export async function updateScore(req, res, next) {
  try { const score = await Score.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true }); if (!score) return res.status(404).json({ message: "Score not found" }); res.json(score); } catch (error) { next(error); }
}

export async function deleteScore(req, res, next) {
  try { await Score.findOneAndDelete({ _id: req.params.id, user: req.user._id }); res.json({ message: "Score deleted" }); } catch (error) { next(error); }
}