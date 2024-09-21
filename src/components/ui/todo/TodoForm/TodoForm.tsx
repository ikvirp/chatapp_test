import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../../../../store/todo/todoSlice";

const TodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText && text.length <= 300) {
      dispatch(addTodo(trimmedText));
      setText("");
      setError("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);

    if (value.length > 300) {
      setError("Название задачи не может превышать 300 символов.");
    } else {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mb-6">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        className={`p-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg mb-4`}
        placeholder="Введите название"
      />
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${error || !text.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        disabled={!!error || !text.trim()}
      >
        Добавить
      </button>
    </form>
  );
};

export default TodoForm;
