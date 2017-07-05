import fetch from '../utils/fetch';

export function getTasks(user_id) {
  return fetch({
    url: '/tasks/' + user_id,
    method: 'get'
  });
}