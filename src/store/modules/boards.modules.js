import axios from "axios";
export default {
    state: () => ({
        currentBoardId: 0,
        listBoards: null,
        load: false,
        tasks: null,
    }),
    mutations: {
        setTasks(state, tasks) {
            state.tasks = tasks;
        },
        addColumn(state, newColumn) {
            state.boards.columns.push(newColumn);
        },
        deleteTask(state, taskId) {
            state.tasks = state.tasks.filter(task => task.id !== taskId);
        },
        addBoards(state, data) {
            state.listBoards = data;
        },
        addBoard(state, newBoard) { // New mutation
            state.listBoards.push(newBoard);
        },
        deleteBoard(state, boardId) {
            // Use filter to remove the board from the list
            state.listBoards = state.listBoards.filter(board => board.id !== boardId);
        },
        editBoard(state, updatedBoard) {
            const boardIndex = state.listBoards.findIndex(board => board.id === updatedBoard.id);
            if (boardIndex !== -1) {
                state.listBoards[boardIndex] = updatedBoard;
            }
        },
        setCurrentBoardId(state, data) {
            state.currentBoardId = data;
        },
    },
    actions: {
        async loadBoards(store, data) {
            try {
                const request = await axios.get(
                    `https://todo-list.edu-playground.ru/api/v1/user/${store.rootState.auth.userId}/boards`, {
                        headers: { "X-Base-Auth": store.rootState.auth.token },
                    }
                );

                if (request.status == 200) {
                    console.log(store);
                    store.commit("addBoards", request.data);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteTask({ commit }, taskId) {
            try {
                await axios.delete(`https://your-api-url/tasks/${taskId}`);
                commit('removeTask', taskId);
            } catch (error) {
                console.error(error);
            }
        },
        async addNewColumn({ commit, state }, { boardId, columnData }) {
            try {
                const response = await axios.post(`https://todo-list.edu-playground.ru/api/v1/boards/${boardId}/statuses`, {
                    formData: {
                        name: columnData,
                    }
                });
                commit('addColumn', response.data);
            } catch (error) {
                console.error(error);
            }
        },
        async editBoard({ commit, rootState }, updatedBoardData) {
            try {
                console.log(updatedBoardData);
                const request = await axios.put(
                    `https://todo-list.edu-playground.ru/api/v1/user/${rootState.auth.userId}/boards/${updatedBoardData.id}`, {
                        formData: {
                            name: updatedBoardData.name,
                            description: updatedBoardData.description,
                        },
                    }, {
                        headers: { "X-Base-Auth": rootState.auth.token },
                    }
                );

                if (request.status === 200) {
                    commit("editBoard", updatedBoardData);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteBoard({ commit, rootState }, boardId) {
            try {
                const request = await axios.delete(
                    `https://todo-list.edu-playground.ru/api/v1/user/${rootState.auth.userId}/boards/${boardId}`, {
                        headers: { "X-Base-Auth": rootState.auth.token },
                    }
                );

                if (request.status === 204) {
                    commit('deleteBoard', boardId);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addNewBoard({ commit, rootState }, boardData) {
            try {
                console.log(boardData);
                const request = await axios.post(
                    `https://todo-list.edu-playground.ru/api/v1/user/${rootState.auth.userId}/boards`, {
                        formData: {
                            name: boardData.name,
                            description: boardData.description,
                        }
                    }, {
                        headers: { "X-Base-Auth": rootState.auth.token },
                    }
                );

                if (request.status === 201) {
                    commit("addBoards", [...rootState.boards.listBoards, request.data]);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async loadTasks(store, board_id) {
            try {

                const request = await axios.get(
                    `https://todo-list.edu-playground.ru/api/v1/boards/${store.rootState.boards.currentBoardId}/tasks`, {
                        headers: { "X-Base-Auth": store.rootState.auth.token },
                    }
                );

                if (request.status == 200) {
                    console.log(request.data);

                    store.commit("setTasks", request.data);
                    store.commit("setCurrentBoardId", board_id);
                }
            } catch (error) {
                console.log(error);
            }
        },
    },
    getters: {
        getCurrentBoardId(state) {
            return state.currentBoardId;
        },
    },
};