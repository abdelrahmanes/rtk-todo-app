import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const todoSlice = createSlice({
  name: "todos",
  initialState: JSON.parse(localStorage.getItem("todos")) || [],
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        completed: false,
      };
      state.push(todo);
      localStorage.setItem("todos", JSON.stringify(state));
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    editTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].title = action.payload.title;
      localStorage.setItem("todos", JSON.stringify(state));
    },
    deleteTodo: (state, action) => {
      const filteredTodos = state.filter(
        (todo) => todo.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(filteredTodos));

      return filteredTodos;
    },

    toggleCompleteAll: (state, action) => {
      state.map((todo) =>
        action.payload.checked
          ? (todo.completed = true)
          : (todo.completed = false)
      );
      localStorage.setItem("todos", JSON.stringify(state));
    },

    deleteCompleted: (state, action) => {
      const filteredTodos = state.filter((todo) => todo.completed !== true);
      localStorage.setItem("todos", JSON.stringify(filteredTodos));

      return filteredTodos;
    },
  },
});

export const {
  deleteCompleted,
  toggleCompleteAll,
  addTodo,
  toggleComplete,
  editTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
