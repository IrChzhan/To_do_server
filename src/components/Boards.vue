<script>
import { defineComponent } from "vue";
import Column from "@/components/Column.vue";
import AddTaskButton from "@/components/AddTaskButton.vue";
import ModalWindowBoard from "@/components/ModalWindowBoard.vue";
import AddBoardButton from "@/components/AddBoardButton.vue";
import DeleteButton from "@/components/EditButton.vue";
import  EditButton from "./EditRealButton.vue";
import EditModalWindow from "./EditModalWindow.vue"
import {mapActions, mapGetters, mapMutations, mapState} from "vuex"

export default defineComponent({
  name: "Kanban",
  components: {
    Column,
    AddTaskButton,
    ModalWindowBoard,
    AddBoardButton,
    DeleteButton,
    EditButton,
    EditModalWindow,
  },
  data() {
    return {
      showModal: false,
      showEditModal: false,
      newBoardData: {
        id: null,
        name: "",
        description: "",
        createdAt: null,
        updatedAt: null,
        owner: "",
      },
    };
  },
  computed: {
     
    ...mapState({boards:state=>state.boards.listBoards})
  },
  methods: {
    ...mapMutations(['setCurrentBoardId']),
    ...mapActions(["loadBoards", "addNewBoard", "deleteBoard", "editBoard"]),
    openEditModal(boardId) {
      this.showEditModal = true;
      this.currentBoardId = boardId;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.currentBoardId = null;
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    addNewBoard(boardData) 
    {
    this.$store.dispatch('addNewBoard', boardData);
    },
    editBoard(boardData) {
          this.$store.dispatch('editBoard', boardData);
    },
    deleteBoard(boardId) {
      this.$store.dispatch('deleteBoard', boardId);
    },
    open_status(id) {
    this.setCurrentBoardId(id); 
    this.$router.push(`/boards/${id}`);
  },
  },
  async mounted() {
    await this.loadBoards();
    console.log(this);
  },
});
</script>

<template>
  <body>
    <header class="header">
      <div class="container header__container">
        <h1 class="header__title">Kanban Boards</h1>
        <div class="header__option">
          <AddBoardButton @click="openModal"/>
          <ModalWindowBoard  v-if="showModal" @boardSubmitted="addNewBoard" @close="()=>showModal=false"/>
        </div>
      </div>
    </header>
    <div class="board-container">
      <div v-for="board in boards" :key="board.id" class="board">
        <EditModalWindow v-if="showEditModal" @boardEdit="editBoard":board-id="board.id" @close="()=>showEditModal=false"/>
        <div class="name_container">
          <h3 class="board__title">{{ board.name }}</h3>
          <DeleteButton @click="deleteBoard(board.id)"/>
          <EditButton @click="openEditModal"/>
        </div>
        <div class="board__description">{{ board.description }}</div>
        <button class="button_open" @click.prevent="()=> open_status(board.id)">Открыть</button>
      </div>
    </div>
    <footer class="footer">
      <p class="footer__text">To-Do-List-Kanban</p>
    </footer>
  </body>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2b1887;
  color: white;
  min-height: 100vh;
  min-width: 380px;
}

html {
  min-width: 380px;
}

.header__container,
footer {
  background-color: #1c0e5e;
  text-align: center;
  padding: 10px 0;
  width: 500px;
  margin-left: 550px;
}

.header__title,
.footer__text {
  margin: 0;
  padding: 10px 0;
}

header {
  margin-top: 10px;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  margin-left: 500px;
  width: 100px;
}

.header__title {
  font-weight: 300;
}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__user-icon {
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.header__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  width: 500px;
}

.header__title {
  font-weight: 300;
}

.name_container {
  justify-content: space-between;
}

.header__option {
  display: flex;
  align-items: center;
  gap: 15px;
}

.header__user-icon {
  width: 40px;
  height: 40px;
  background-color: #d9d9d9;
  border-radius: 50%;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  text-decoration: none;
  color: black;
  font-size: 24px;
}

.cancel-button {
  padding: 10px 20px;
  background-color: rgb(255, 0, 64);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: darkred;
}
.button_open {
  margin-top: 10px;
  margin-left: 200px;
  color: white;
  background-color: #2b1887;
  size: 5;
  border-color: white;
  border-radius: 5px;
  width: 70px;
  height: 30px;
}
.board-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-left: 500px;
  }

  .board {
    background-color: #D5CCFF;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
  }

  .board__title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .board__description {
    font-size: 14px;
  }
@media screen and (max-width: 768px) {
  .container {
    max-width: 540px;
    margin: 0;
    padding: 0;
  }
}

@media screen and (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media screen and (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media screen and (min-width: 992px) {
  .container {
    max-width: 960px;
  }

  .kanban__column {
    flex: 0 0 calc(33.333% - 20px);
  }
}

@media screen and (max-width: 992px) {
  .kanban {
    width: 100%;
    flex-wrap: wrap;
    flex-direction: column;
    padding: 20px;
  }

  .kanban__column {
    width: 100%;
  }
}

@media screen and (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

@media screen and (min-width: 1400px) {
  .container {
    max-width: 1320px;
  }
}
</style>