<template>
  <div class="login">
    <header v-bind:email="email"></header>
    <div class="dashboard">
      <div class="important">
        <div class="block important-urgent">
          <text class="title important-urgent-title">
            Important 
            &
            Urgent
          </text>
          <list class="list">
            <cell @click="finishTask(task)" class="cell" v-for="task in tasks['important-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
        </div>
        <div class="block important-not-urgent">
          <text class="title important-not-urgent-title">
            Important 
            & 
            Not Urgent
          </text>
          <list class="list">
            <cell @click="finishTask(task)" class="cell" v-for="task in tasks['important-not-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
        </div>
      </div>
      <div class="not-important">
        <div class="block not-important-urgent">
          <text class="title not-important-urgent-title">
            Not Important
            & 
            Urgent
          </text>
          <list class="list">
            <cell @click="finishTask(task)" class="cell" v-for="task in tasks['not-important-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
        </div>
        <div class="block not-important-not-urgent">
          <text class="title not-important-not-urgent-title">
            Not Important 
            & 
            Not Urgent
          </text>
          <list class="list">
            <cell @click="finishTask(task)" class="cell" v-for="task in tasks['not-important-not-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
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

  .dashboard {
    flex-direction: column;
    align-content: stretch;
    width: 750px;
  }

  .title {
    position: absolute;
    height: 617px;
    width: 375px;
    padding-top: 200px;
    /*text-align: center;*/
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

  .block {
    width: 375px;
    height: 617px;
  }

  .important-urgent {
    background-color: #ffeae5;
  }

  .important-urgent-title {
    color: #fc8f80;
  }

  .important-not-urgent {
    background-color: #eff3dd;
  }

  .important-not-urgent-title {
    color: #9dcc62;
  }

  .not-important-urgent {
    background-color: #e3f2ff;
  }

  .not-important-urgent-title {
    color: #4ac0e4;
  }

  .not-important-not-urgent {
    background-color: #f0f0f0;
  }

  .not-important-not-urgent-title {
    color: #b4b4b4;
  }

  .task {
    color: #fff;
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 10px;
    border: #fff 1px solid;
    border-radius: 10px;
    background-color: rgba(1, 1, 1, .5);
  }
</style>

<script>
  import Header from '../components/header.vue'
  const modal = weex.requireModule('modal')

  export default {
    data() {
      return {}
    },
    components: {
      Header
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
      },
      email() {
        return this.$store.getters.email
      }
    },
    methods: {
      finishTask(task) {
        this.loading = true;
        this.$store.dispatch('FinishTask', task).then(() => {
          this.loading = false;
        }, (err) => {
          this.loading = false;
        });
      }
    }
  }
</script>