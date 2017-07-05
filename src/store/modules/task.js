import {
  getTasks,
  finishTask
} from '../../api/task';
import Cookies from 'js-cookie';

const task = {
  state: {
    user_id: Cookies.get('User-Id'),
    tasks: {
      'important-urgent': [],
      'important-not-urgent': [],
      'not-important-urgent': [],
      'not-important-not-urgent': []
    }
  },

  mutations: {
    SET_TASKS: (state, tasks) => {
      state.tasks = tasks;
    }
  },

  actions: {
    // 获取Task
    GetTasks({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getTasks(state.user_id).then(response => {
          const data = response.data;
          const tasks = {
            'important-urgent': [],
            'important-not-urgent': [],
            'not-important-urgent': [],
            'not-important-not-urgent': []
          };
          data.map((item, index) => {
            if (!item.isFinished) {
              switch (item.type) {
                case '1':
                  tasks['important-urgent'].push(item);
                  break;
                case '2':
                  tasks['important-not-urgent'].push(item);
                  break;
                case '3':
                  tasks['not-important-urgent'].push(item);
                  break;
                case '4':
                  tasks['not-important-not-urgent'].push(item);
                  break;
                default:
              }
            }
            return index
          })
          commit('SET_TASKS', tasks);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    FinishTask({
      commit,
      state
    }, task) {
      return new Promise((resolve, reject) => {
        task.isFinished = true;
        finishTask(
          task._id,
          state.user_id,
          task
        ).then(response => {
          const data = response.data;
          commit('FINISH_TASKS', data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
};

export default task;