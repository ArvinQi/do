<template>
  <div @swipe="swipe" class="task" @appear="initState">
    <app-header :title="title"></app-header>
    <div class="task-form">
      <div>
        <text class="label">Title</text>
        <input v-model="taskTitle" type="text" class="input" placeholder="title"></input>
      </div>
      <div>
        <text class="label">Type</text>
        <input @click="pickerType" disabled="true" :value="taskTypeList[taskType-1]" type="text" class="input" placeholder="type"></input>
      </div>
      <!--<div>
        <text class="label">Estimate(/h)</text>
        <input v-model="taskEstimate" type="number" class="input textarea" placeholder="details"></input>
      </div>-->
      <div>
        <text class="label">Details</text>
        <textarea v-model="taskDetails" class="input textarea" placeholder="details"></textarea>
      </div>
      <text class="button" value="Save" @click="saveTask"></text>
      <text class="button btn-error" value="Delete" @click="deleteTask(taskId)" v-if="taskId > 0"></text>
      <text class="button btn-warning" value="Back" @click="jump('/index')" v-else></text>
    </div>
  </div>
</template>

<style scoped>
  .task {
    background-color: #fff;
    align-content: stretch;
    height: 1334px;
  }

  .button {
    height: 80px;
    white-space: nowrap;
    cursor: pointer;
    border: 1px solid #bfcbd9;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 40px;
    margin-right: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 48px;
    border-radius: 8px;
    color: #ffffff;
    background-color: #20a0ff;
    border-color: #ddd;
  }

  .btn-warning {
    background: #f7ba2a;
  }

  .btn-error {
    background: #ff4949;
  }

  .label {
    float: none;
    height: 40px;
    display: inline-block;
    text-align: left;
    /*padding-bottom: 10px;*/
    padding-left: 40px;
    text-align: left;
    vertical-align: middle;
    color: #48576a;
    box-sizing: border-box;
  }

  .task-form {
    flex-direction: column;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .input {
    height: 80px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 40px;
    margin-right: 40px;
    /*placeholder-color: #ccc;*/
    background-color: #ffffff;
    background-image: none;
    border-radius: 8px;
    border: 1px solid #bfcbd9;
    border-width: 1px;
    border-style: solid;
    border-color: #bfcbd9;
    box-sizing: border-box;
    color: #1f2d3d;
    display: inline-block;
    font-size: inherit;
    line-height: 1;
    outline: none;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 10px;
    padding-right: 10px;
    /*transition: border-color .2s cubic-bezier(.645, .045, .355, 1);*/
  }

  .input:focus {
    outline: none;
    border-color: #20a0ff;
  }

  .textarea {
    height: 160px;
    padding-top: 20px;
  }
</style>

<script>
  import AppHeader from '../components/app-header.vue'
  const modal = weex.requireModule('modal')
  const picker = weex.requireModule('picker')
  export default {
    data() {
      return {
        loading: false,
        taskId: 0,
        title: 'Add Task',
        taskTitle: '',
        taskDetails: '',
        taskType: 1,
        taskTypeList: [
          'important & urgent',
          'important & not urgent',
          'not important & urgent',
          'not important & not urgent'
        ],
        task: {}
      }
    },
    created() {},
    components: {
      AppHeader
    },
    mounted() {
      this.taskId = parseInt(this.$route.params.task_id);
      if (this.taskId > 0) {
        this.loading = true;
        this.$store.dispatch('GetTask', this.taskId).then(response => {
          this.loading = false;
          this.taskTitle = response.title;
          this.taskType = parseInt(response.type);
          this.taskDetails = response.details;
        }, (err) => {
          this.loading = false;
        });
      }
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
      swipe(e) {
        if (e.direction === 'right') {
          this.$router.push('/index')
        }
      },
      pickerType() {
        const self = this;
        picker.pick({
          items: self.taskTypeList,
          height: "200px"
        }, function (ret) {
          var result = ret.result;
          if (result == 'success') {
            self.taskType = ret.data + 1;
          }
        })
      },
      saveTask() {
        const task = {
          title: this.taskTitle,
          type: this.taskType + '',
          details: this.taskDetails
        };
        if (this.taskId > 0) {
          //update
          task._id = this.taskId
          this.$store.dispatch('UpdateTask', task).then(response => {
            this.$store.dispatch('GetTasks');
            this.$router.push('/index')
          })
        } else {
          //add
          this.$store.dispatch('AddTask', task).then(response => {
            this.$store.dispatch('GetTasks');
            this.$router.push('/index')
          })
        }
      },
      deleteTask(task_id) {
        this.$store.dispatch('DeleteTask', task_id).then(response => {
          this.$store.dispatch('GetTasks');
          this.$router.push('/index')
        })
      }
    }
  }
</script>