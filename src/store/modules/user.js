import {
  loginByEmail,
  // logout,
  getInfo,
  registerByEmail,
  verifyEmail
} from '../../api/login';
// import Cookies from 'js-cookie';
const storage = weex.requireModule('storage')

const user = {
  state: {
    user_id: '',
    user: '',
    status: '',
    email: '',
    code: '',
    uid: undefined,
    auth_type: '',
    token: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    scope: ''
  },
  getters: {},
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
    },
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER_ID: (state, user_id) => {
      state.user_id = user_id;
    },
    SET_SCOPE: (state, scope) => {
      state.scope = scope;
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({
      commit
    }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        loginByEmail(email, userInfo.password).then(response => {
          const data = response.data;
          storage.setItem('User-Token', data.token);
          storage.setItem('User-Id', data.user_id);
          storage.setItem('User-Email', email);
          commit('SET_TOKEN', data.token);
          commit('SET_EMAIL', email);
          commit('SET_USER_ID', data.user_id);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 邮箱注册
    RegisterByEmail({
      commit
    }, userInfo) {
      const email = userInfo.email.trim();
      return new Promise((resolve, reject) => {
        registerByEmail(email, userInfo.password).then(response => {
          const data = response.data;
          commit('SET_EMAIL', data.email);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 验证邮箱
    VerifyEmail({
      commit
    }, params) {
      const token = params.token;
      return new Promise((resolve, reject) => {
        verifyEmail(token).then(response => {
          const data = response.data;
          commit('SET_EMAIL', data.email);
          resolve(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        storage.getItem('User-Id', e => {
          getInfo(e.data).then(response => {
            const data = response.data;
            storage.setItem('User-Scope', data.scope);
            // commit('SET_ROLES', data.role);
            // commit('SET_NAME', data.name);
            // commit('SET_AVATAR', data.avatar);
            // commit('SET_UID', data.uid);
            // commit('SET_INTRODUCTION', data.introduction);
            commit('SET_SCOPE', data.scope);
            resolve(response);
          }).catch(error => {
            reject(error);
          });
        })
      });
    },

    // 第三方验证登录
    LoginByThirdparty({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          storage.setItem('User-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },


    // 登出
    LogOut({
      commit
    }) {
      return new Promise(resolve => {
        // logout(state.token).then(() => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        storage.removeItem('User-Token');
        resolve();
        // }).catch(error => {
        //   reject(error);
        // });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        storage.removeItem('User-Token');
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        storage.setItem('User-Token', role);
        resolve();
      })
    }
  }
};

export default user;