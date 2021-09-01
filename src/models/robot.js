const tag = '[RobotModel]';

export default {
  // get Initial Msg from Server
  createRobot(message) {
    console.log(tag, 'createRobot()')
    if (window.fetch) {
      return fetch('/robots', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: { msg: message }
      })
        .then(res => res.json())
        .then(json => json.msg)
        .catch(err => { throw new Error(err) });
    }
    // for IE
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('post', '/robots', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
        let msg = JSON.parse(this.responseText).msg;
        resolve(msg);
      }
      xhr.send({ msg: message });
    });
  },
  sendCommands(id, message) {
    console.log(tag, 'sendCommands()')
    if (window.fetch) {
      return fetch('/robots/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: { msg: message }
      })
        .then(res => res.json())
        .then(json => json.msg)
        .catch(err => { throw new Error(err) });
    }
    // for IE
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('put', '/robots/' + id, true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
        let msg = JSON.parse(this.responseText).msg;
        resolve(msg);
      }
      xhr.send({ msg: message });
    });
  }
};