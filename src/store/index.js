// import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app';
import user from './modules/user';
import task from './modules/task';
import permission from './modules/permission';
import getters from './getters';
// import actions from './actions';
import router from '../router'

// Vuex is auto installed on the web
if (WXEnvironment.platform !== 'Web') {
  Vue.use(Vuex)
}

const store = new Vuex.Store({
  modules: {
    app,
    user,
    task,
    permission
  },
  state: {
    activeType: null,
    items: {},
    users: {},
    counts: {
      top: 20,
      new: 20,
      show: 15,
      ask: 15,
      job: 15
    },
    tasks: {

    },
    lists: {
      top: [],
      new: [],
      show: [],
      ask: [],
      job: []
    }
  },
  getters: {
    ...getters,
    // ids of the items that should be currently displayed based on
    // current list type and current pagination
    activeIds(state) {
      const { activeType, lists, counts } = state
      return activeType ? lists[activeType].slice(0, counts[activeType]) : []
    },

    // items that should be currently displayed.
    // this Array may not be fully fetched.
    activeItems(state, getters) {
      return getters.activeIds.map(id => state.items[id]).filter(_ => _)
    }
  }
})

export default store
