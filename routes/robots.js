const express = require('express');
const jsonParser = express.json();
const router = express.Router();
const config = require('config');
const CommandsController = require('../controllers/commands');
const commandsController = new CommandsController();
const GridsController = require('../controllers/grids');
const gridsController = new GridsController();
const directions = config.get('directions');
const commands = config.get('commands');

const robotsRouter = function robotsRouter(grid) {
  /**
   * Initializes a new robot
   */
  router.post('/', jsonParser, (req, res) => {
    if (grid && grid.limits) {
      const initData = req.body.msg && req.body.msg.split(' ');
      const x = Array.isArray(initData) && Number(initData[0]);
      const y = Array.isArray(initData) && Number(initData[1]);
      const validData = x >= 0 && x <= grid.limits.x
        && y >= 0 && y <= grid.limits.y && directions.indexOf(initData[2]) !== -1;
      if (validData) {
        const robot = {
          position: [x, y],
          direction: initData[2],
          lost: false,
          id: grid.robots.length,
        };
        grid.robots.push(robot);
        grid.currentRobot = robot.id;
        res.status(201).json({ robot }).end();
      } else {
        res.status(400).json({ error: 'Bad format' }).end();
      }
    } else {
      res.status(500).json({ error: 'Grid not initialized' }).end();
    }
  });

  /**
   * Execute command on the specified robot
   */
  router.put('/:id', jsonParser, (req, res) => {
    const commandsData = req.body.msg && req.body.msg.split('');
    const robot = grid.robots[req.params.id];
    if (robot) {
      const finalRobotState = commandsData.reduce((data, command) => {
        const commandMethod = commands[command];
        if (!data.lost && !data.error && commandsController[commandMethod]) {
          const newState = commandsController[commandMethod](data.position, data.direction);
          const newPositionCheck = gridsController
            .checkNewPosition(grid, data.position, newState.position);
          if (newPositionCheck.canMove) {
            if (newPositionCheck.lost) {
              data.lost = true;
              return data;
            }
            return newState;
          }
          return data;
        }
        if (data.error || data.lost) {
          return data;
        }
        return { error: 'Method not implemented' };
      }, { position: robot.position, direction: robot.direction });
      if (finalRobotState.error) {
        res.status(500).json({ error: finalRobotState.error }).end();
      } else {
        robot.direction = finalRobotState.direction;
        robot.position = finalRobotState.position;
        robot.lost = finalRobotState.lost;
        res.status(200).json(robot);
      }
    } else {
      res.status(404).json({ error: 'Robot not found' }).end();
    }
  });

  return router;
};
module.exports = robotsRouter;
