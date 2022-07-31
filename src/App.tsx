import InputField from './components/InputField';
import { useState } from 'react';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import {TodoState} from "./context/Context";
import {DragDropContext, DropResult} from 'react-beautiful-dnd';

const App:React.FC = () => {

  const {state, dispatch} = TodoState();

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  //Adds the todo
  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo)
    {
      setTodos([...todos, {id: Date.now(), todo, isDone: false, isCompleted: false}])
      dispatch({type: "add", payload:todo})
    }
    setTodo("");
  };

  //Function for drag & drop logic
  const onDragEnd = (result:DropResult) => {
    const {source, destination} = result;

    //If there is an invalid destination then return
    if(!destination)return;

    //If the destination is the same as the source (same element) return
    if(destination.droppableId === source.droppableId &&
      destination.index === source.index) return;

      //Convert from state
      let add,
      active = state.filter((todo:Todo)=> todo.isCompleted === false),
      complete = state.filter((todo:Todo)=> todo.isCompleted === true);

      //Source
      if(source.droppableId === "TodosList")
      {
        add = active[source.index];
        active.splice(source.index, 1)
        dispatch({type: "completed", payload: add.id})
      }else {
        add = complete[source.index];
        active.splice(source.index, 1)
        dispatch({type: "active", payload: add.id})
      }

      //Destination
      if(destination.droppableId === "TodosList")
      {
        active.splice(destination.index,0, add);
        dispatch({type: "active", payload: add.id})
      } else {complete.splice(destination.index,0, add);dispatch({type: "completed", payload: add.id})}
    }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
      <TodoList/>
      </div>
    </DragDropContext>
  );
}

export default App;