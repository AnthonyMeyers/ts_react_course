import {Todo} from "./model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import React, {useState, useRef, useEffect} from "react";
import {TodoState} from "../context/Context";

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}: Props) => {

    const {state, dispatch} = TodoState();

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id:number) => {
        dispatch({type: "done", payload: id})
    }

    const handleDelete = (id:number)=> {
        dispatch({type: "remove", payload:id})
    }

    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();
        dispatch({type: "edit", payload: {id, todo: editTodo}})
        setEdit(false);
    }

    useEffect(() => {inputRef.current?.focus()},[edit])

    const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="todos__single" onSubmit={(e)=>handleEdit(e,todo.id)}>


        {edit ? (<input value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}  className="todos__single--text"/>) :
            todo.isDone? (<s className="todos__single--text">{todo.todo}</s>)
            : (<span className="todos__single--text">{todo.todo}</span>)
        }
        
        <div>
        <span className="icon" onClick={()=>{if(!edit && !todo.isDone){setEdit(!edit)}}}><AiFillEdit/></span>
        <span className="icon" onClick={()=> handleDelete(todo.id)}><AiFillDelete/></span>
        <span className="icon" onClick={()=>handleDone(todo.id)}><MdDone/></span></div>
    </form>
  )
}

export default SingleTodo