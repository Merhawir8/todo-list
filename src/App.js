import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import { ListGroupItem, NavItem } from 'react-bootstrap';
// import Form from './components/Form';


export default () => {
  const [inputVal, setInputVal] = useState("");
  const [list, setList] = useState([]);

  const add = e => {
    e.preventDefault();
    //make sure we do not input empty tasks
    if(inputVal === "") return;
    //set list, copy over the list and add a task obj with text and a boolean completed
    setList([...list, {
      text: inputVal,
      completed: false
    }]);
    //rest the input field
    setInputVal("")
  }

  const toggleChecked = index => {
    const listItemToBeChanged = {
    ...list[index]
    };
    // we want the one to turn on or off
    listItemToBeChanged.completed = !listItemToBeChanged.completed
        // we are saying if it is true, now it is false vice versa
    // we want to put the item back in it its place
    setList([
      ...list.slice(0,index),
          // this is the beginning to the index
      listItemToBeChanged,
          // then we are adding if it in the third position  
      ...list.slice(index +1)
          // then we are adding the rest of the index
    ])
  }

  const remove = index => {
    setList(list.filter((_listObj, i) => i !== index))
  }

  return (
    <div className="col-4 mx-auto card my-3" style={{backgroundColor:"peachpuff"}}>
      <div className="card-header">
        <h3>what is the plan for today?!</h3>
      </div>
      <form className="form-group" onSubmit={add}>
        <input 
        type="text" 
        name="todo"
        className="form-control"
        onChange={e => setInputVal(e.target.value)}
        value={inputVal}
        />
        <div>
          <button className="btn btn-outline-primary btn-sm m-2 p-2">Add</button>
        </div>
      </form>
      {list.map( (listItemObject, index) =>(
        <div key={index}>
            <span 
              className="m-2" 
              style={{ textDecoration: listItemObject.completed && 'line-through'}}>{listItemObject.text}</span>
              {/* this allows the inputVal to show under the add button */}
            <input 
            type="checkbox"
            checked={listItemObject.completed}
            onClick={ () => toggleChecked(index)}
            />
            <button 
            className=".btn.btn-outline-danger.btn-sm m-1 p-2"
            onClick={ () => remove(index)}
            >Delete
            </button>
          

        </div>
      ))}

    </div>
  );
}

