import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteCompleted,
  toggleCompleteAll,
} from "../redux/todoSlice";

const AddTodoForm = () => {
  const todos = useSelector((state) => state.todos);
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (value) {
      await dispatch(
        addTodo({
          title: value,
        })
      );

      setValue("");
    }
  };

  const allChecked =
    todos.filter((todo) => todo.completed === true).length === todos.length;

  const handleCompleteAllClick = () => {
    dispatch(toggleCompleteAll({ checked: !allChecked }));
  };
  const handleDeleteCompletedClick = () => {
    dispatch(deleteCompleted());
  };
  return (
    <form onSubmit={onSubmit} className="form-inline mt-3 mb-5">
      <label className="sr-only">Name</label>
      <input
        type="text"
        className="form-control mb-2 mr-sm-2"
        placeholder="Add todo..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>

      <div className="d-flex justify-content-between align-items-center ">
        <button type="submit" className="btn btn-success text-white mb-2">
          Submit
        </button>
        {todos.length > 0 && (
          <div className="d-flex align-items-center gap-2">
            <button
              onClick={handleCompleteAllClick}
              className="btn btn-success"
            >
              {allChecked ? "uncheck all" : "Complete all"}
            </button>
            <button
              onClick={handleDeleteCompletedClick}
              className="btn btn-danger"
            >
              Delete completed
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddTodoForm;
