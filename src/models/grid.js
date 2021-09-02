const axios = require('axios');
const tag = '[GridModel]';

export default {
  createGrid(message) {
    console.log(tag, 'createGrid()')
    return axios.post('/grids', { msg: message })
      .then(res => res.data)
      .catch(err => { 
        const message = err.response && err.response.data ? err.response.data.error : err;
        throw new Error(message);
      });
  },
  getCurrentRobotId() {
    console.log(tag, 'getCurrentRobotId()')
    return axios.get('/grids/robots/current')
      .then(res => res.data.id)
      .catch(err => { 
        const message = err.response && err.response.data ? err.response.data.error : err;
        throw new Error(message);
      });
  }
};