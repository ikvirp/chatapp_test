import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../../../../store/todo/todoSlice";
import { Edit2, Trash, Menu, TickCircle } from "iconic-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  order: number;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewText(value);
    if (value.length > 300) {
      setError("Задача не может превышать 300 символов.");
    } else {
      setError("");
    }
  };

  const handleEdit = () => {
    const trimmedText = newText.trim();
    if (trimmedText && trimmedText !== text && !error) {
      dispatch(editTodo({ id, text: trimmedText }));
    }
    setIsEditing(false);
  };

  return (
    <div
      className="flex items-center text-left bg-white py-5 px-2 border-b-2 border-b-gray-100"
      draggable={!isEditing}
      onDragStart={!isEditing ? onDragStart : undefined}
      onDragOver={!isEditing ? onDragOver : undefined}
      onDrop={!isEditing ? onDrop : undefined}
    >
      <div className="cursor-pointer mr-4 flex-shrink-0">
        <Menu size={20} variant="Bold" color="#BDBDBD" />
      </div>
      <div className="flex items-center flex-grow min-w-0">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => dispatch(toggleTodo(id))}
          className="min-w-5 min-h-5 mr-3 flex-shrink-0"
        />
        <div className="flex-grow min-w-0 overflow-hidden">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={newText}
                onChange={handleChange}
                onBlur={handleEdit}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleEdit();
                  }
                }}
                className={`w-full p-2 border rounded-lg ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:outline-none`}
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          ) : (
            <span
              className={`cursor-pointer break-words block w-full ${
                completed ? "line-through text-gray-500" : ""
              }`}
              onDoubleClick={() => !completed && setIsEditing(true)}
            >
              {text}
            </span>
          )}
        </div>
      </div>
      <div className="flex space-x-3 ml-3 flex-shrink-0">
        {isEditing ? (
          <button onClick={handleEdit} className="text-sm" disabled={!!error}>
            <TickCircle size="20" color="#BDBDBD" variant="Bold" />
          </button>
        ) : (
          <>
            {!completed && (
              <button onClick={() => setIsEditing(true)}>
                <Edit2 variant="Bold" color="#BDBDBD" size={20} />
              </button>
            )}
            <button onClick={() => dispatch(deleteTodo(id))}>
              <Trash variant="Bold" color="#BDBDBD" size={20} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
