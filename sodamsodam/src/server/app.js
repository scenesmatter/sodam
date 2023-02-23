import cookieParser from "cookie-parser";
import express from "express";

import mainRouter from "./router/mainRouter";
import subRouter from "./router/subRouter";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/client/views");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/client", express.static("src/client"));
app.use("/file", express.static("file"));
app.use("/img", express.static("img")); 

app.use("/", mainRouter);
app.use("/sub", subRouter);

export default app;
