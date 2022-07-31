import {Todo} from "./model";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import React, {useState, useRef, useEffect} from "react";
import {TodoState} from "../context/Context";
import {Draggable} from "react-beautiful-dnd";

//Props type declaration
type Props = {
    index:number;
    todo: Todo;
}

const SingleTodo = ({index, todo}: Props) => {

    //Gets dispatch in the fray
    const {dispatch} = TodoState();

    //set the usestates
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    //Checks the todo as done, undone
    const handleDone = (id:number) => {
        dispatch({type: "done", payload: id})
    }

    //Deletes the todo
    const handleDelete = (id:number)=> {
        dispatch({type: "remove", payload:id})
    }

    //Lets the user edit the todo
    const handleEdit = (e:React.FormEvent, id:number) => {
        e.preventDefault();
        dispatch({type: "edit", payload: {id, todo: editTodo}})
        setEdit(false);
    }

    useEffect(() => {inputRef.current?.focus()},[edit])

    const inputRef = useRef<HTMLInputElement>(null);

  return (

    <Draggable draggableId={todo.id.toString()} index={index}>
        {
        (provided, snapshot) => (
            <form className={`todos__single ${snapshot.isDragging ? 'drag' : ""}`} onSubmit={(e)=>handleEdit(e,todo.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                >


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
    
    </Draggable>
  )
}

export default SingleTodo