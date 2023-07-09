import React, { useState, useEffect } from "react";
import "./style.css";

// Get the local storage data
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setINputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  // Add items functions
  const addItem = () => {
    if (!inputdata) {
      alert("Plz fill the data.");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((currElem) => {
          if (currElem.id === isEditItem) {
            return { ...currElem, name: inputdata };
          }
          return currElem;
        })
      );
      setINputData("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setItems([...items, myNewInputData]);
      setINputData("");
    }
  };

  // Edit the items
  const editItem = (index) => {
    const item__todo__edited = items.find((currElem) => {
      return currElem.id === index;
    });
    setINputData(item__todo__edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  // Delete items function
  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItem);
  };

  // Remove all the elements
  const removeAll = () => {
    setItems([]);
  };

  // Adding localStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="/image/front.png" alt="logo" />
            <div className="addItems">
              <input
                type="text"
                placeholder="📝 Add your list here"
                className="form-control"
                value={inputdata}
                onChange={(event) => {
                  setINputData(event.target.value);
                }}
              />
              {toggleButton ? (
                <i className="far fa-edit add-btn" onClick={addItem}></i>
              ) : (
                <i class="fa fa-plus add-btn" onClick={addItem}></i>
              )}
            </div>
            <div className="showItems">
              {items.map((currElem) => {
                return (
                  <div className="eachItem" key={currElem.id}>
                    <h3>{currElem.name}</h3>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => {
                          editItem(currElem.id);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => {
                          deleteItem(currElem.id);
                        }}
                      ></i>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Todo;
