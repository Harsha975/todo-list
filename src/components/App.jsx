import React, { useState } from "react";
import List from "./list"

function App() {
  const [inputName, setInputName] = useState("");
  const [items, setitems] = useState([])


  function handleInput(event) {
    let item = event.target.value;
    setInputName(item);

  }

  function updateit() {
    setitems((previous) => {
      return [...previous, inputName];
    });
    setInputName("");
  }

  function todeleteitem(id){
    setitems((previous) => {
      return previous.filter((item,index) => index!== id);
      });
  }

  function addingitem(item,index) {
    return (<List
      item={item}
      key={index}
      id={index}
      onclicked={todeleteitem}
    />);
  }


  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input type="text" onChange={handleInput} value={inputName} />
        <button onClick={updateit}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map(addingitem)}
        </ul>
      </div>
    </div>
  );
}

export default App;
