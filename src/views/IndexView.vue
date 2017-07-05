<template>
  <div class="login">
    <text class="logo">D O</text>
    <div class="dashboard">
      <div class="important">
        <div class="important-urgent">
          <div class="important-urgent-title">

          </div>
          <list class="list">
            <cell class="cell" v-for="task in tasks['important-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
        </div>
        <div class="important-not-urgent">
          <text>2</text>
        </div>
      </div>
      <div class="not-important">
        <div class="not-important-urgent">
          <text>123</text>
        </div>
        <div class="not-important-not-urgent">
          <text>1234</text>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .login {
    background-color: #fff;
    align-content: stretch;
    flex: column;
    height: 100%;
  }

  .logo {
    font-size: 60px;
    color: #663366;
    text-align: center;
  }

  .dashboard {
    flex-direction: column;
    align-content: stretch;
    width: 750px;
  }

  .important {
    flex-direction: row;
    align-content: stretch;
    width: 750px;
  }

  .not-important {
    flex-direction: row;
    align-content: stretch;
  }

  .important-urgent {
    background-color: #ffeae5;
    width: 375px;
    height: 667px;
  }

  .important-not-urgent {
    background-color: #eff3dd;
    width: 375px;
    height: 667px;
  }

  .not-important-urgent {
    background-color: #e3f2ff;
    width: 375px;
    height: 667px;
  }

  .not-important-not-urgent {
    background-color: #f0f0f0;
    width: 375px;
    height: 667px;
  }
  .task{
    color: #1f2f3d;
  }
</style>

<script>
  const modal = weex.requireModule('modal')

  export default {
    data() {
      return {
      }
    },
    mounted() {
      this.loading = true;
      this.$store.dispatch('GetTasks').then(() => {
        this.loading = false;
        // this.$router.push({
        //   path: '/top'
        // });
        // this.showDialog = true;
      }, (err) => {
        this.loading = false;
      });
    },
    computed: {
      tasks() {
        return this.$store.getters.tasks
      }
    },
    methods: {
      goto(url) {
        this.$router.push({path: url});
      },
      login() {
        this.error = "";
        if (!this.email) {
          this.error = "Please input the username or email!"
        } else if (!this.password) {
          this.error = "Password need!"
        } else {
          this.loading = true;
          this.$store.dispatch('LoginByEmail', {
            email: this.email,
            password: this.password
          }).then(() => {
            this.loading = false;
            this.$router.push({
              path: '/top'
            });
            // this.showDialog = true;
          }, (err) => {
            this.loading = false;
          });
        }
      }
    }
  }
</script>