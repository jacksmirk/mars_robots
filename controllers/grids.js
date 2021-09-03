const GridsController = function GridsController() {};

/**
 * Checks new position in grid and return wheter the robot is lost or if the movement can be done
 * @param {object} grid the grid
 * @param {array} current the current position of the robot
 * @param {array} newPosition the position the robot is trying to move to
 * @returns {object}
 */
GridsController.prototype.checkNewPosition = function checkPosition(grid, current, newPosition) {
  if (newPosition[0] < 0 || newPosition[1] < 0
    || newPosition[0] > grid.limits.x || newPosition[1] > grid.limits.y) {
    const lostRobotInCurrentPosition = grid.robots
      .findIndex((robot) => robot.lost === true
        && robot.position[0] === current[0] && robot.position[1] === current[1]);
    if (lostRobotInCurrentPosition === -1) {
      return { canMove: true, lost: true };
    }
    return { canMove: false, lost: false };
  }
  return { canMove: true, lost: false };
};

module.exports = GridsController;
