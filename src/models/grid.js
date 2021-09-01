const tag = '[GridModel]';

export default {
  // get Initial Msg from Server
  createGrid(message) {
    console.log(tag, 'getNewGrid()')
    if (window.fetch) {
      return fetch('/grids', {
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
      xhr.open('post', '/grids', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function () {
        let msg = JSON.parse(this.responseText).msg;
        resolve(msg);
      }
      xhr.send({ msg: message });
    });
  }
};