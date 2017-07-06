import {
  getTasks,
  finishTask
} from '../../api/task';
// import Cookies from 'js-cookie';
const storage = weex.requireModule('storage')
const task = {
  state: {
    // user_id: storage.getItem('User-Id'),
    tasks: {
      'important-urgent': [],
      'important-not-urgent': [],
      'not-important-urgent': [],
      'not-important-not-urgent': []
    },
    finishTasks: [

    ]
  },

  mutations: {
    SET_TASKS: (state, tasks) => {
      state.tasks = tasks;
    }
    // FINISH_TASKS: (state, task) => {

    // }
  },

  actions: {
    // 获取Task
    GetTasks({
      commit
    }) {
      return new Promise((resolve, reject) => {
        storage.getItem('User-Id', e => {
          if (e.data) {
            getTasks(e.data).then(response => {
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
          }
        })
      });
    },
    // 完成 Task
    FinishTask({
      commit
    }, task) {
      return new Promise((resolve, reject) => {
        task.isFinished = true;
        storage.getItem('User-Id', e => {
          finishTask(
            task._id,
            e.data,
            task
          ).then(() => {
            // const data = response.data;
            // commit('FINISH_TASKS', data);
            resolve();
          }).catch(error => {
            reject(error);
          });
        });
      })
    }
  }
};

export default task;