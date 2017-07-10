<template>
  <div class="index" @appear="initState">
    <app-header title="D O"></app-header>
    <div class="dashboard">
      <div class="important">
        <div class="block important-urgent">
          <text class="title important-urgent-title">
            Important 
            &
            Urgent
          </text>
          <list class="list">
            <cell @click="finishTask(task)" @longpress="jump('/task/'+task._id)" class="cell" v-for="task in tasks['important-urgent']" v-bind:key="task._id">
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
            <cell @click="finishTask(task)" @longpress="jump('/task/'+task._id)" class="cell" v-for="task in tasks['important-not-urgent']" v-bind:key="task.id">
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
            <cell @click="finishTask(task)" @longpress="jump('/task/'+task._id)" class="cell" v-for="task in tasks['not-important-urgent']" v-bind:key="task.id">
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
            <cell @click="finishTask(task)" @longpress="jump('/task/'+task._id)" class="cell" v-for="task in tasks['not-important-not-urgent']" v-bind:key="task.id">
              <div class="panel">
                <text class="task">{{task.title}}</text>
              </div>
            </cell>
          </list>
        </div>
      </div>
    </div>
    <div @click="jump('/task/-1')" class="add-task">
      <div class="add-task-icon">
        <div class="add-task-icon-before"></div>
        <div class="add-task-icon-after"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .index {
    flex-direction: column;
    background-color: #fff;
    align-content: stretch;
  }

  .dashboard {
    flex-direction: column;
  }

  .title {
    position: absolute;
    height: 617px;
    padding-top: 200px;
  }

  .important {
    flex-direction: row;
    flex-shrink: 1;
  }

  .not-important {
    flex-direction: row;
  }

  .block {
    height: 605px;
    flex: 1;
  }

  .important-urgent {
    background-color: #ffeae5;
    flex-grow: 1;
  }

  .important-urgent-title {
    color: #fc8f80;
  }

  .important-not-urgent {
    background-color: #eff3dd;
    flex-grow: 1;
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
  .add-task {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 100;
    height:80px; 
    width:80px; 
    border-style: solid;
    border-width: 1px;
    border-color: #ddd;
    border-radius: 80px;
    background: #58b7ff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .add-task:active{
    background: #20a0ff;

  }
  .add-task-icon {
    height:40px; 
    width:40px; 
    display:block; 
    position:relative;
  } 
  .add-task-icon-before, 
  .add-task-icon-after{
    content:''; 
    height:8px; 
    width:40px; 
    display:block; 
    background:#fff; 
    border-radius:10px;
    position:absolute; 
    top:16px; 
    left:0px;
  }
  .add-task-icon-after{
    height:40px; 
    width:8px; 
    top:0; 
    left:16px; 
  }
</style>

<script>
  import AppHeader from '../components/app-header.vue'
  const modal = weex.requireModule('modal')

  export default {
    data() {
      return {}
    },
    created() {
    },
    components: {
      AppHeader
    },
    mounted() {
      this.loading = true;
      this.$store.dispatch('GetTasks').then(() => {
        this.loading = false;
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
          this.$store.dispatch('GetTasks').then(res=>{
            console.log(res)
          })
        }, (err) => {
          this.loading = false;
        });
      }
    }
  }
</script>