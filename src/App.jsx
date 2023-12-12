import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

 
function App() {
  const [isCompleteScreen,setisCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);;
  const [newTitle,setNewTitle]=useState("");
  const [newDescription,setDescription]=useState("");
const [completedTodos,setCompletedTodos]=useState([]);


  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    };
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr))
  };
  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

const handleComplete=(index)=>{
  let now=new Date();
  let dd=now.getDate();
  let mm=now.getMonth()+1;
  let yyyy=now.getFullYear();
  let h=now.getHours();
  let m=now.getSeconds();
  let s=now.getSeconds();
  let completedOn=dd+'-'+mm+'-'+yyyy+'-'+'at'+h+':'+m+':'+s;

  let filteredItem={
    ...allTodos[index],
    completedOn:completedOn
  }
  let updatedCompletedArr=[...completedTodos];
  updatedCompletedArr.push(filteredItem);
  setCompletedTodos(updatedCompletedArr);
  handleDeleteTodo(index);
  localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));
}

const handleDeleteCompletedTodo=(index)=>{
  let reducedTodo=[...completedTodos];
  reducedTodo.splice(index);
  localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
  setCompletedTodos(reducedTodo);
}

  useEffect(()=>{

let savedTodo=JSON.parse(localStorage.getItem('todolist'))
let savedCompletedTodo=JSON.parse(localStorage.getItem('completedTodos'))

if(savedTodo){
  setTodos(savedTodo);
}

if(savedCompletedTodo){
  setCompletedTodos(savedCompletedTodo);
}
  },[])
  return <>
  <div className='App'>
  <h1>My Todo</h1>
  <div className='todo-wrapper'>

    <div className='todo-input'>
      <div className='todo-input-item'>
        <label>
          Name
        </label>
        <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder='Enter your name'/>
      </div>
      <div className='todo-input-item'>
        <label>
          Description
        </label>
        <input type='text' value={newDescription} onChange={(e)=>setDescription(e.target.value)} placeholder='Enter Description'/>
      </div>
      <div className='todo-input-item'>
        <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
      </div>
    </div>
    <div className='btn-area'>
      <button className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} 
      onClick={()=>setisCompleteScreen(false)}>Not Completed</button>
      <button className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} 
      onClick={()=>setisCompleteScreen(true)}>Completed</button>
    </div>
    <div className='todo-list'>
      {isCompleteScreen===false && allTodos.map((item,index)=>{
        return(
          <div className='todo-list-item' key={index}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div>
        <MdDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
        <MdModeEdit className='check-icon' title='clickhere to move completed state' onClick={()=>handleComplete(index)}/>
      </div>
      </div>
        )
      })
    }
{isCompleteScreen===true && completedTodos.map((item,index)=>{
        return(
          <div className='todo-list-item' key={index}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <p><small>Completed on: {item.completedOn}</small></p>

        <div>
        <MdDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)}/>
      </div>
      </div>
        )
      })
    }


    </div>
  </div>
  </div>
  </>
}

export default App