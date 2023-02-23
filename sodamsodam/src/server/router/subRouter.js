import express from "express";
import { getCoupon } from "../controller/subController";

const subRouter = express.Router();

subRouter.get("/coupon", getCoupon)

export default subRouter;