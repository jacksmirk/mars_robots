const tag = '[MessageModel]';

export default {
  // get Initial Msg from Server
  getInitMsg() {
    console.log(tag, 'getInitMsg()');
    if (window.fetch) {
      return fetch('/messages', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => json.msg)
        .catch((err) => { throw new Error(err); });
    }
    // for IE
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('get', '/messages', true);
      xhr.setRequestHeader('Content-type', 'application/json');
      xhr.onload = function onload() {
        const { msg } = JSON.parse(this.responseText);
        resolve(msg);
      };
      xhr.send();
    });
  },
};
