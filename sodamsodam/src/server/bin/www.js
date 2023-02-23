"use strict";

import "dotenv/config";
import "regenerator-runtime";
import app from "../app";

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.info(`server open http://localhost:${PORT}`)
});