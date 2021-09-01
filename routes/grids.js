const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const gridsRouter = function(grid) {
  /**
   * Initializes the grid
   */
  router.post('/', jsonParser, (req, res, next) => {
    const msg = req.body && req.body.msg;
    const coords = msg && msg.split(' ');
    const coordsValid = coords && Array.isArray(coords) && coords.length === 2;
    const x = coordsValid && coords[0] > 0 && coords[0] <= 50 && coords[0];
    const y = coordsValid && coords[1] > 0 && coords[1] <= 50 && coords[1];
    const valid = x && y;
    if (valid) {
      grid.robots = [];
      grid.limits = { x, y };
      res.status(201).json({ grid });
    } else {
      res.status(400).json({ error: 'Bad format' });
    }
  });

  return router;
}

module.exports = gridsRouter;
