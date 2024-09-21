import React from "react";

interface FilterButtonsProps {
  currentFilter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
}

const TodoFilter: React.FC<FilterButtonsProps> = ({
  currentFilter,
  setFilter,
}) => {
  return (
    <div className="flex items-center justify-left space-x-3 my-4">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-lg ${
          currentFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Все
      </button>
      <button
        onClick={() => setFilter("active")}
        className={`px-4 py-2 rounded-lg ${
          currentFilter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        Невыполненные
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-lg ${
          currentFilter === "completed"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        Выполненные
      </button>
    </div>
  );
};

export default TodoFilter;
