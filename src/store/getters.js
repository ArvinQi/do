const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  user_id: state => state.user.user_id,
  scope: state => state.user.scope,
  tasks: state => state.task.tasks,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  uid: state => state.user.uid,
  email: state => state.user.email,
  introduction: state => state.user.introduction,
  auth_type: state => state.user.auth_type,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters
