const axios = require('axios');
const tag = '[RobotModel]';

export default {
  createRobot(message) {
    console.log(tag, 'createRobot()');
    return axios.post('/robots', { msg: message })
      .then((res) => res.data)
      .catch((err) => {
        const message = err.response && err.response.data ? err.response.data.error : err;
        throw new Error(message);
      });
  },
  sendCommands(id, message) {
    console.log(tag, 'sendCommands()');
    return axios.put(`/robots/${id}`, { msg: message })
      .then((res) => res.data)
      .catch((err) => {
        const message = err.response && err.response.data ? err.response.data.error : err;
        throw new Error(message);
      });
  },

};
