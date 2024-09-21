import React, { useState } from "react";
import TodoList from "../components/ui/todo/TodoList/TodoList";
import TodoForm from "../components/ui/todo/TodoForm/TodoForm";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import TodoFilter from "../components/ui/todo/TodoFilter/TodoFilter";
const MainPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const todos = useSelector((state: RootState) => state.todos.todos);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    }
    if (filter === "active") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full lg:px-96 lg:py-12 px-4 py-4">
      <h1 className="text-4xl font-bold text-left mb-4 text-zinc-900">
        Список дел (Todo List)
      </h1>

      <TodoFilter currentFilter={filter} setFilter={setFilter} />

      <TodoForm />
      <div className="overflow-y-auto flex-grow p-4 bg-white rounded-lg ">
        <TodoList todos={filteredTodos} filter={filter} />
      </div>
    </div>
  );
};

export default MainPage;
