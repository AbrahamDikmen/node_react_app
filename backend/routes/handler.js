const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Abraham",
      age: 25,
    },
    {
      id: 1,
      name: "Daniel",
      age: 23,
    },
  ]);
});

module.exports = router;
