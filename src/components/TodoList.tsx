import {Todo} from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import {TodoState} from "../context/Context";
import {Droppable} from "react-beautiful-dnd";

const TodoList: React.FC= () => {

  //Makes the list of active & completed todos from the state
  const {state} = TodoState();
  const todolist = state.filter((todo: Todo) => todo.isCompleted === false);
  const completedTodos = state.filter((todo: Todo) => todo.isCompleted === true);

  return (
    <>
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          (provided,snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>

              <span className="todos_heading">Active tasks</span>
  
              {todolist.map((todo:Todo, index:number)=><SingleTodo index={index} todo={todo} key={todo.id}/>)}
              {provided.placeholder}
            </div>)
        }

      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (

          <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}  ref={provided.innerRef} {...provided.droppableProps}>

          <span className="todos_heading">Completed tasks</span>

          {completedTodos.map((todo:Todo, index:number)=><SingleTodo index={index} todo={todo} key={todo.id}/>)}
          {provided.placeholder}
          </div>)
        }

      </Droppable>

    </div>
    </>
  )
}

export default TodoList
