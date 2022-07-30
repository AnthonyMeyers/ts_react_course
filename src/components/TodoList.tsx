import {Todo} from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import {TodoState} from "../context/Context";
import {Droppable} from "react-beautiful-dnd";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
    completedTodos: Todo[];
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
}

const TodoList: React.FC<Props> = ({todos, setTodos, completedTodos,setCompletedTodos}: Props) => {

  const {state} = TodoState();
  const todolist = state;

  return (
    <>
    <div className="container">
      <Droppable droppableId="TodosList">
        {
          (provided,snapshot) => (
            <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`} ref={provided.innerRef} {...provided.droppableProps}>

              <span className="todos_heading">Active tasks</span>
  
              {todolist.map((todo:Todo, index:number)=><SingleTodo index={index} todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>)}
              {provided.placeholder}
            </div>)
        }

      </Droppable>
      <Droppable droppableId="TodosRemove">
        {
          (provided, snapshot) => (

          <div className={`todos remove ${snapshot.isDraggingOver ? "dragcomplete" : ""}`}  ref={provided.innerRef} {...provided.droppableProps}>

          <span className="todos_heading">Completed tasks</span>

          {completedTodos.map((todo:Todo, index:number)=><SingleTodo index={index} todo={todo} key={todo.id} todos={completedTodos} setTodos={setCompletedTodos}/>)}
          {provided.placeholder}
          </div>)
        }

      </Droppable>

    </div>
    </>
  )
}

export default TodoList

//<div className="todos">{todolist.map((todo:Todo) => <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>)}</div>