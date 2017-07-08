

import store from '../store';
import router from '../router'
const modal = weex.requireModule('modal')
// const storage = weex.requireModule('storage')
const stream = weex.requireModule('stream');

const fetch = opt => {
  const params = {};
  // const api = 'http://localhost:8000/api';
  const api = 'http://do.arvinqi.com:8080/api';
  params.url = api + opt.url;
  params.method = opt.method;
  params.type = 'json';
  params.headers = {
    'Content-Type': 'application/json'
  };
  // storage.getItem('User-Token', e => {})
  if (store.getters.token) {
    params.headers.authorization = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (opt.data) {
    params.body = JSON.stringify(opt.data);
  } else {
    params.body = ''
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
        });
        if (error.statusCode === 401) {
          router.push('/login')
        }
        reject(response);
      }
    })
  });
}
export default fetch