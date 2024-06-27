"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";

// Define the Todo interface
export interface Todo {
  text: string;
  completed: boolean;
}

// The TodoList component
const TodoList: React.FC = () => {
  // State for the list of todos
  const [todos, setTodos] = useState<Todo[]>([]);
  // State for the input field
  const [input, setInput] = useState<string>("");
  // State for the current filter
  const [filter, setFilter] = useState<string>("All");

  // Function to add a new todo
  const addTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  // Handle pressing the Enter key to add a todo
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  // Function to delete a todo
  const deleteTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // Function to toggle the completion status of a todo
  const toggleTodo = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  // Function to get the todos based on the current filter
  const getFilteredTodos = () => {
    if (filter === "Active") {
      return todos.filter((todo) => !todo.completed);
    }
    if (filter === "Completed") {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  };

  return (
    <div className="container mx-auto p-4">
      {/* Title */}
      <h1 className="text-[31px] font-bold absolute left-[280px] mb-4">
        All Tasks
      </h1>
      
      {/* Filter buttons */}
      <div className="flex mb-4 justify-around">
        <button
          onClick={() => setFilter("All")}
          className={`p-2 text-[22px] absolute left-[54px] top-[150px] ${
            filter === "All" ? "text-[#EA5959] font-bold" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          className={`p-2 text-[22px] absolute left-[54px] top-[200px] ${
            filter === "Active" ? "text-[#EA5959] font-bold" : ""
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`p-2 text-[22px] absolute left-[54px] top-[250px] ${
            filter === "Completed" ? "text-[#EA5959] font-bold" : ""
          }`}
        >
          Completed
        </button>
      </div>

      {/* Input field for adding new todos */}
      <div className="absolute left-[280px] top-[95px] mb-4">
        <input
          type="text"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          onKeyPress={handleKeyPress}
          className="rounded-lg p-3 flex-grow mr-1 w-[630px] bg-[#F3F3F3]"
          placeholder="Add a new task inside 'All' category"
        />
      </div>

      {/* List of todos */}
      <ul className="absolute left-[270px] top-[170px]">
        {getFilteredTodos().map((todo, index) => (
          <li
            key={index}
            className="flex text-[18px] text-[#5A5A5A80] p-2 mb-2 bg-white"
          >
            {/* Checkbox to toggle completion */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(index)}
              className="mr-2 w-[28px] bg-[#5A5A5A]"
            />
            {/* Todo text */}
            <span
              className={`flex-grow ${
                todo.completed ? "line-through" : "text-[#5A5A5A]"
              }`}
            >
              {todo.text}
            </span>
            {/* Button to delete the todo */}
            <button
              onClick={() => deleteTodo(index)}
              className="text-[#EA5959] absolute left-[610px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
