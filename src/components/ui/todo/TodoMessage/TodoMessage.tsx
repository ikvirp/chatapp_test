import React from "react";

interface EmptyStateProps {
  message: string;
}

const TodoMessage: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <p>{message}</p>
    </div>
  );
};

export default TodoMessage;
