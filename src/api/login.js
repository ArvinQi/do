import fetch from '../utils/fetch';

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  };
  return fetch({
    url: '/auth/signin',
    method: 'post',
    data
  });
}

export function registerByEmail(email, password) {
  const data = {
    email,
    password
  };
  return fetch({
    url: '/auth/signup',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

