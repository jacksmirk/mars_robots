const express = require('express');
const router = express.Router();
const jsonParser = express.json();

const gridsRouter = function gridsRouter(grid) {
  /**
   * Initializes the grid
   */
  router.post('/', jsonParser, (req, res) => {
    const msg = req.body && req.body.msg;
    const coords = msg && msg.split(' ');
    const coordsX = Number(coords[0]);
    const coordsY = Number(coords[1]);
    const coordsValid = coords && Array.isArray(coords) && coords.length === 2
      && Number.isInteger(coordsX) && Number.isInteger(coordsY)
      && coordsX > 0 && coordsX <= 50
      && coordsY > 0 && coordsY <= 50;
    if (coordsValid) {
      grid.robots = [];
      grid.limits = {
        x: coordsX,
        y: coordsY,
      };
      res.status(201).json({ grid });
    } else {
      res.status(400).json({ error: 'Bad format' });
    }
  });

  /**
   * Sends back the current robot id
   */
  router.get('/robots/current', (req, res) => {
    res.status(200).json({ id: grid.currentRobot }).end();
  });

  return router;
};

module.exports = gridsRouter;
