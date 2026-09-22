import Charity from "../models/Charity.js";
export async function listCharities(req, res, next) { try { res.json(await Charity.find({ isActive: true }).sort({ isFeatured: -1, name: 1 })); } catch (error) { next(error); } }
export async function createCharity(req, res, next) { try { res.status(201).json(await Charity.create(req.body)); } catch (error) { next(error); } }