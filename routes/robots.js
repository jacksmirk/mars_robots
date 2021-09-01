const express = require('express');
const jsonParser = express.json();
const router = express.Router();
const commandsController = require('../controllers/commands');
const gridsController = require('../controllers/grids');
const config = require('config');
const directions = config.get('directions');
const commands = config.get('commands');

const robotsRouter = function(grid) {
  /**
   * Initializes a new robot
   */
  router.post('/', jsonParser, (req, res, next) => {
    if (grid && grid.limits) {
      const initData = req.body.msg && req.body.msg.split(' ');
      const validData = Array.isArray(initData) && initData[0] >= 0 && initData[0] <= grid.limits.x
        && initData[1] >= 0 && initData[1] <= grid.limits.y && directions.indexOf(initData[2]) !== -1;
      if (validData) {
        const robot = {
          position: [ initData[0], initData[1]],
          direction: initData[2],
          lost: false,
          id: grid.robots.length
        };
        grid.robots.push(robot);
        grid.currentRobot = robot.id;
        res.status(201).json({ robot }).end();
      } else {
        res.status(400).json({ error: 'Bad format' }).end();
      }
    } else {
      res.status(500).json({ error: 'Grid not initialized'}).end();
    }
  });

  /**
   * Execute command on the specified robot
   */
  router.put('/:id', jsonParser, (req, res, next) => {
    const commandsData = req.body.msg && req.body.msg.split('');
    const robot = grid.robots[req.params.id];
    if (robot) {
      let error = '';
      const finalRobotState = commandsData.reduce((robotData, command) => {
        const commandMethod = commands[command];
        if (!robotData.lost && !robotData.error && commandsController[commandMethod]) {
          const newState = commandsController[commandMethod](robotData.position, robotData.direction);
          const newPositionCheck = gridsController.checkNewPosition(grid, robotData.position, newState.position);
          if (newPositionCheck.canMove) {
            newState.lost = newPositionCheck.lost;
            return newState;
          }
          return robotData;
        }
        if (robotData.error || robotData.lost) {
          return robotData;
        }
        return { error: 'Method not implemented' };
      }, { position: robot.position, direction: robot.direction });

      if (finalRobotState.error) {
        res.status(500).json({ error: finalRobotState.error }).end();
      } else {
        robot.direction = finalRobotState.direction;
        robot.position = finalRobotState.position;
        robot.status = finalRobotState.status ? finalRobotState.status : robot.status;
      }
    } else {
      res.status(404).json({ error: 'Robot not found' }).end();
    }
  });

  return router;
}
module.exports = robotsRouter;
