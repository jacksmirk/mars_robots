const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  let msg = { msg: "Welcome to Mars Robots App!" }
  res.json(msg).end();
});

module.exports = router;
