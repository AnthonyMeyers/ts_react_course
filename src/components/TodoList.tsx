import {Todo} from "./model";
import SingleTodo from "./SingleTodo";
import "./styles.css";
import {TodoState} from "../context/Context";

interface Props{
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>; 
}

const TodoList: React.FC<Props> = ({todos, setTodos}: Props) => {

  const {state} = TodoState();
  const todolist = state;

  return (
    <>
    <div className="todos">{todolist.map((todo:Todo) => <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos}/>)}</div>
    </>
  )
}

export default TodoList