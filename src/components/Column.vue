<template>
  <section :class="['kanban__column', 'kanban__column--' + column.id]">
    <div class="kanban__header">
      <div class="kanban__header-content">
        <img src="@/assets/done.svg" class="done_img">
        <h2 class="kanban__title">{{ column.name }}</h2>
        {{ column.name }}
      </div>
      <AddTaskButton @click="showModal=true" />
      <ModalWindow v-if="showModal" @close="()=>showModal=false"  @taskSubmitted="addNewTask1" />
    </div>
    <div class="kanban__list">
      <Task v-for="task in filteredTasks" :key="task.id" :task="task" />
    </div>
  </section>
</template>

<script>
import Task from "./Task.vue";
import AddTaskButton from './AddTaskButton.vue';
import ModalWindow from './ModalWindow.vue'

export default {
  components: {
    Task,
    AddTaskButton,
    ModalWindow,
  },
  props: {
    column: {
      type: Object,
      required: true,
      default: { id: 1, title: "Задачи", icon: "@/assets/done.svg", tasks: [] }
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    getTaskById(taskId) {
   return this.tasks.find((task) => task.id === taskId);
  },
  addNewTask1(taskData) {
   console.log('create new Task...')
  const newTask = {
    id: this.tasks.length + 1,
    title: taskData.title,
    description: taskData.description,
    dueDate: taskData.dueDate,
    columnId: this.column.id,
  };
  this.tasks.push(newTask);
  this.showModal = false;
},
 handleEditTask(task) {
   console.log("Edit task:", task);
 },
},
  computed: {
    filteredTasks() {
      return this.$store.state.boards.tasks.filter(task => task.columnId === this.column.id);
    },
  },
};
</script>
  <style>
.kanban {
    display: flex;
    padding: 40px;
    align-items: flex-start;
    gap: 40px;
    
}

.kanban__column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 24px;
    flex: 1 0 0;

    padding: 14px;

    border-radius: 12px;
    background-color: #D5CCFF;
}

.kanban__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.kanban__header-content {
    display: flex;
    align-items: center;
    gap: 10px;

}

.kanban__title {
    color: #2B1887;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.kanban__icon--add:hover {
    cursor: pointer;
    opacity: .5;
}

.kanban__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
}
</style>