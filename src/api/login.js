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

export function verifyEmail(token) {
  return fetch({
    url: '/auth/confirmation?token=' + token,
    method: 'get'
  });
}
export function resendEmail(data) {
  return fetch({
    url: '/auth/resendverification',
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

export function getInfo(user_id) {
  return fetch({
    url: '/auth/' + user_id,
    method: 'get'
  });
}

