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
