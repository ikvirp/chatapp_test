import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  order: number;
}

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      let newId = uuidv4();
      while (state.todos.some((todo) => todo.id === newId)) {
        newId = uuidv4();
      }

      const newTodo: Todo = {
        id: newId,
        text: action.payload,
        completed: false,
        order: state.todos.length + 1,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    editTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const todo = state.todos.find((t) => t.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    reorderTodos: (
      state,
      action: PayloadAction<{ id: string; order: number }[]>
    ) => {
      const orderMap = new Map(
        action.payload.map(({ id, order }) => [id, order])
      );
      state.todos = state.todos.map((todo) => ({
        ...todo,
        order: orderMap.get(todo.id) ?? todo.order,
      }));
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, reorderTodos } =
  todoSlice.actions;

export default todoSlice.reducer;
