import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo, editTodo } from "../redux/todoSlice";

const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();
  const [disabled, setdisabled] = useState(true);
  const [newValue, setNewValue] = useState(title);
  const titleRef = useRef(null);
  const handleCheckboxClick = () => {
    dispatch(
      toggleComplete({
        id,
        completed: titleRef.current && !disabled ? completed : !completed,
      })
    );
  };

  const handleDeleteClick = () => {
    dispatch(deleteTodo({ id }));
  };

  const handleEditClick = () => {
    titleRef.current.focus();
    setdisabled(false);
  };

  const handleSaveClick = () => {
    setdisabled(true);
    dispatch(editTodo({ id, title: newValue }));
  };

  return (
    <li
      className={`list-group-item ${
        completed && "list-group-item-success"
      } d-flex justify-content-between`}
    >
      <div
        className="d-flex align-items-center w-100 cursor-pointer"
        onClick={handleCheckboxClick}
      >
        <input type="checkbox" className="mr-3" checked={completed}></input>
        <input
          disabled={disabled}
          ref={titleRef}
          className={`mx-3 border-0 w-100 h-100 outline-none  px-1 cursor-pointer ${
            !disabled && "focused"
          }`}
          type={"text"}
          value={newValue}
          onChange={(e) => {
            setNewValue(e.target.value);
          }}
        ></input>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          onClick={disabled ? handleEditClick : handleSaveClick}
          className="btn btn-primary"
        >
          {disabled ? "Edit" : "Save"}
        </button>
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
