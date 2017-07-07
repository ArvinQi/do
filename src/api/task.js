import fetch from '../utils/fetch';

export function getTasks(user_id) {
  return fetch({
    url: '/tasks/' + user_id,
    method: 'get'
  });
}
export function getTask(user_id, task_id) {
  return fetch({
    url: '/tasks/' + user_id + '/task/' + task_id,
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
export function updateTask(task_id, user_id, task) {
  delete task._id
  return fetch({
    url: '/tasks/' + user_id + '/task/' + task_id,
    method: 'put',
    data: task
  })
}
export function addTask(user_id, task) {
  return fetch({
    url: '/tasks/' + user_id + '/task',
    method: 'post',
    data: task
  })
}
export function deleteTask(user_id, task_id) {
  return fetch({
    url: '/tasks/' + user_id + '/task/' + task_id,
    method: 'delete'
  })
}