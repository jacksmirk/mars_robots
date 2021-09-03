const CommandsController = function CommandsController() {
};

/**
 * Calculates robot's next position
 * @param {array} position current position in grid
 * @param {string} direction current direction
 * @returns {object}
 */
CommandsController.prototype.moveForward = function moveForward(position, direction) {
  const newPosition = [...position];
  switch (direction) {
    case 'N':
      newPosition[1] += 1;
      break;
    case 'S':
      newPosition[1] -= 1;
      break;
    case 'E':
      newPosition[0] += 1;
      break;
    case 'W':
      newPosition[0] -= 1;
      break;
    default:
      break;
  }
  return { position: newPosition, direction };
};

/**
 * Calculates next direction when turning right
 * @param {array} position current position in grid
 * @param {string} direction current direction
 * @returns {object}
 */
CommandsController.prototype.turnRight = function turnRight(position, direction) {
  let newDirection = '';
  switch (direction) {
    case 'N':
      newDirection = 'E';
      break;
    case 'S':
      newDirection = 'W';
      break;
    case 'E':
      newDirection = 'S';
      break;
    case 'W':
      newDirection = 'N';
      break;
    default:
      break;
  }
  return { position, direction: newDirection };
};

/**
 * Calculates next direction when turning left
 * @param {array} position current position in grid
 * @param {string} direction current direction
 * @returns {object}
 */
CommandsController.prototype.turnLeft = function turnLeft(position, direction) {
  let newDirection = '';
  switch (direction) {
    case 'N':
      newDirection = 'W';
      break;
    case 'S':
      newDirection = 'E';
      break;
    case 'E':
      newDirection = 'N';
      break;
    case 'W':
      newDirection = 'S';
      break;
    default:
      break;
  }
  return { position, direction: newDirection };
};

module.exports = CommandsController;
