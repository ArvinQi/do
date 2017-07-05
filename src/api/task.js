import fetch from '../utils/fetch';

export function getTasks(user_id) {
  return fetch({
    url: '/tasks/' + user_id,
    method: 'get'
  });
}
export function finishTask(task_id, user_id, task) {
  const data = {
    title: task.title,
    details: task.details,
    isFinished: task.isFinished
  }
  return fetch({
    url: '/tasks/' + user_id + '/task/' + task_id,
    method: 'put',
    data
  })
}