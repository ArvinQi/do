

import store from '../store';
const modal = weex.requireModule('modal')

const stream = weex.requireModule('stream');

const fetch = opt => {
  const params = {};
  const api = 'http://localhost:8000/api';
  params.url = api + opt.url;
  params.method = opt.method;
  params.type = 'json';
  params.headers = {
    'Content-Type': 'application/json'
  };
  if (store.getters.token) {
    params.headers.authorization = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (opt.data) {
    params.body = JSON.stringify(opt.data);
  }
  return new Promise((resolve, reject) => {
    stream.fetch(params, response => {
      if (response.ok) {
        resolve(response);
      } else {
        const error = response.data;
        modal.toast({
          message: error.message,
          duration: 0.8
        })
        reject(response);
      }
    })
  });
}
export default fetch