"use strict";

import express from "express";
import {
    getHome,
    getMap,
    getQr,
    postQr,
    getCourse,
    getMypage
} from "../controller/mainController";

const mainRouter = express.Router();

mainRouter.get("/", getHome)
mainRouter.get("/map", getMap)
mainRouter.route("/qr").get(getQr).post(postQr);
mainRouter.get("/course", getCourse)
mainRouter.get("/mypage", getMypage)

export default mainRouter;