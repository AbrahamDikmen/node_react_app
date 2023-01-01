const express = require("express");

const routeHandler = require("./routes/handler.js");

const app = express();

app.use("/api", routeHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listning to port ${port}`));
