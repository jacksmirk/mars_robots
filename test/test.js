const test = require('ava');
const axios = require('axios');

const rest = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

test('Create grid', async (t) => {
  t.plan(4);
  const gridRequest = await rest.post('/grids', { msg: '5 3' });
  // console.log('###GRID###', gridRequest.data);
  t.truthy(gridRequest.data.grid);
  t.truthy(gridRequest.data.grid.limits);
  t.true(gridRequest.data.grid.limits.x === 5);
  t.true(gridRequest.data.grid.limits.y === 3);
});

test('Create robot', async (t) => {
  t.plan(7);
  await rest.post('/grids', { msg: '5 3' });
  const robotRequest = await rest.post('/robots', { msg: '1 1 E' });
  const gridRequest = await rest.get('/grids');
  // console.log('###GRID###', gridRequest.data);
  // console.log('###ROBOT###', robotRequest.data);
  t.truthy(gridRequest.data.grid);
  t.truthy(gridRequest.data.grid.robots);
  t.truthy(gridRequest.data.grid.robots.length);
  t.truthy(robotRequest.data.robot.position);
  t.true(robotRequest.data.robot.position[0] === 1);
  t.true(robotRequest.data.robot.position[1] === 1);
  t.true(robotRequest.data.robot.direction === 'E');
});

test('Send commands', async (t) => {
  t.plan(15);
  await rest.post('/grids', { msg: '5 3' });
  let robotRequest = await rest.post('/robots', { msg: '1 1 E' });
  let robotId = robotRequest.data.robot.id;
  // console.log('###ROBOT###', robotRequest.data);
  let commandsRequest = await rest.put(`/robots/${robotId}`, { msg: 'RFRFRFRF' });
  // console.log('###COMMANDS###', commandsRequest.data);
  t.truthy(commandsRequest.data.position);
  t.true(commandsRequest.data.position[0] === 1);
  t.true(commandsRequest.data.position[1] === 1);
  t.true(commandsRequest.data.direction === 'E');
  t.falsy(commandsRequest.data.lost);

  robotRequest = await rest.post('/robots', { msg: '3 2 N' });
  robotId = robotRequest.data.robot.id;
  // console.log('###ROBOT###', robotRequest.data);
  commandsRequest = await rest.put(`/robots/${robotId}`, { msg: 'FRRFLLFFRRFLL' });
  // console.log('###COMMANDS###', commandsRequest.data);
  t.truthy(commandsRequest.data.position);
  t.true(commandsRequest.data.position[0] === 3);
  t.true(commandsRequest.data.position[1] === 3);
  t.true(commandsRequest.data.direction === 'N');
  t.true(commandsRequest.data.lost === true);

  robotRequest = await rest.post('/robots', { msg: '0 3 W' });
  robotId = robotRequest.data.robot.id;
  // console.log('###ROBOT###', robotRequest.data);
  commandsRequest = await rest.put(`/robots/${robotId}`, { msg: 'LLFFFLFLFL' });
  // console.log('###COMMANDS###', commandsRequest.data);
  t.truthy(commandsRequest.data.position);
  t.true(commandsRequest.data.position[0] === 2);
  t.true(commandsRequest.data.position[1] === 3);
  t.true(commandsRequest.data.direction === 'S');
  t.falsy(commandsRequest.data.lost);
});
