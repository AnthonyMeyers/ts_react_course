import './App.css';
import InputField from './components/InputField';
import { useState } from 'react';
import { Todo } from './components/model';
import TodoList from './components/TodoList';
import {TodoState} from "./context/Context";

const App:React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const {state, dispatch} = TodoState();

  const handleAdd = (e:React.FormEvent) => {
    e.preventDefault();
    if(todo)
    {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}])
      dispatch({type: "add", payload:todo})
    }
    setTodo("");
  };

  return (

      <div className="App">
      <span className="heading">Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}></InputField>
      <TodoList todos={todos} setTodos={setTodos}/>
      </div>

  );
}

export default App;
