
const storage = weex.requireModule('storage')
export default {
  methods: {
    jump(to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/login')
      })
    },
    initState() {
      storage.getItem('User-Id', e => {
        if (e.result === 'success') {
          this.$store.commit('SET_USER_ID', e.data);
        }
      })
      storage.getItem('User-Token', e => {
        if (e.result === 'success') {
          this.$store.commit('SET_TOKEN', e.data);
        }
      })
      storage.getItem('User-Email', e => {
        if (e.result === 'success') {
          this.$store.commit('SET_EMAIL', e.data);
        }
      })
      storage.getItem('User-Scope', e => {
        if (e.result === 'success') {
          this.$store.commit('SET_SCOPE', e.data);
        }
      })
    }
  }
}