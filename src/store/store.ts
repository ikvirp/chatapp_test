import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { TodoState } from "./todo/todoSlice";

function loadState(): { todos: TodoState } | undefined {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) return undefined;
    return { todos: JSON.parse(serializedState) };
  } catch (err) {
    console.error("Ошибка загрузки состояния из localStorage:", err);
    return undefined;
  }
}

function saveState(state: { todos: TodoState }) {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    console.error("Ошибка сохранения состояния в localStorage:", err);
  }
}

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
