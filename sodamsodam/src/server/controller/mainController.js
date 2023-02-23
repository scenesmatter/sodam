"use strict";

import MainService from "../service/MainService.js"

export const getHome = (req, res) => res.render("main/home");
export const getMap = (req, res) => res.render("main/map");

export const getQr = (req, res) => res.render("main/qr");

export const postQr = async (req, res) => {
  const code = req.body.code;
  if (!code) res.status(Error.BAD_REQUEST.status).json(Error.BAD_REQUEST);
  
  try {
    await MainService.updateVisitedStatus(code);
    return res.status(200).json({ code: "OK", message: "방문 완료" });
  } catch (e) {
    if (e.code) return res.status(e.status).json({ code: e.code, message: e.message });
    else return res.status(Error.INTERNAL_SERVER_ERROR.status).json(Error.INTERNAL_SERVER_ERROR);
  }
};

export const getCourse = (req, res) => res.render("main/course");

export const getMypage = (req, res) => res.render("main/mypage");
