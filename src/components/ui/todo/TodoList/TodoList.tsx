import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reorderTodos, Todo } from "../../../../store/todo/todoSlice";
import { RootState } from "../../../../store/store";
import TodoItem from "../TodoItem/TodoItem";
import TodoMessage from "../TodoMessage/TodoMessage";

interface TodoListProps {
  todos: Todo[];
  filter: "all" | "active" | "completed";
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter }) => {
  const dispatch = useDispatch();
  const allTodos = useSelector((state: RootState) => state.todos.todos);

  const [draggedTodoId, setDraggedTodoId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedTodoId(id);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (id: string) => {
    if (draggedTodoId && draggedTodoId !== id) {
      const draggedTodo = allTodos.find((todo) => todo.id === draggedTodoId);
      const targetTodo = allTodos.find((todo) => todo.id === id);

      if (draggedTodo && targetTodo) {
        const updatedTodos = allTodos.map((todo) => {
          if (todo.id === draggedTodo.id) {
            return { ...todo, order: targetTodo.order };
          }
          if (todo.id === targetTodo.id) {
            return { ...todo, order: draggedTodo.order };
          }
          return todo;
        });

        const orderUpdates = updatedTodos.map((todo) => ({
          id: todo.id,
          order: todo.order,
        }));

        dispatch(reorderTodos(orderUpdates));
      }
    }
    setDraggedTodoId(null);
  };

  const completedTodos = todos
    .filter((todo) => todo.completed)
    .sort((a, b) => a.order - b.order);

  const incompleteTodos = todos
    .filter((todo) => !todo.completed)
    .sort((a, b) => a.order - b.order);

  const renderTodoItem = (todo: Todo) => (
    <TodoItem
      key={todo.id}
      {...todo}
      onDragStart={() => handleDragStart(todo.id)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(todo.id)}
    />
  );

  if (allTodos.length === 0) {
    return (
      <TodoMessage message="У тебя пока нет задач. Самое время запланировать свое время!" />
    );
  }

  if (filter === "completed" && completedTodos.length === 0) {
    return (
      <TodoMessage message="У тебя пока нет выполненных задач. Давай завершим что-нибудь!" />
    );
  }

  if (filter === "active" && incompleteTodos.length === 0) {
    return (
      <TodoMessage message="У тебя пока нет активных задач. Самое время создать новую!" />
    );
  }

  return (
    <div className="flex flex-col w-full gap-6">
      {incompleteTodos.length > 0 && (
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Невыполненные задачи</h2>
          {incompleteTodos.map(renderTodoItem)}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Выполненные задачи</h2>
          {completedTodos.map(renderTodoItem)}
        </div>
      )}
    </div>
  );
};

export default TodoList;
