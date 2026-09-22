import Draw from "../models/Draw.js";
import User from "../models/User.js";
export async function listDraws(req, res, next) { try { res.json(await Draw.find().sort({ createdAt: -1 }).limit(12)); } catch (error) { next(error); } }
export async function createDraw(req, res, next) { try { const subscribers = await User.countDocuments({ subscriptionStatus: "active" }); const prizePool = subscribers * 9.99 * 0.4; res.status(201).json(await Draw.create({ ...req.body, prizePool })); } catch (error) { next(error); } }
export async function publishDraw(req, res, next) { try { const draw = await Draw.findByIdAndUpdate(req.params.id, { status: "published" }, { new: true }); if (!draw) return res.status(404).json({ message: "Draw not found" }); res.json(draw); } catch (error) { next(error); } }