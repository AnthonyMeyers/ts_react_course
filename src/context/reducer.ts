import {Todo} from "../components/model";

type Actions = 
| {type: "add", payload:string}
| {type: "remove", payload:number}
| {type: "done", payload: number}
| {type: "edit", payload: Todo}
| {type: "completed", payload: number}
| {type: "active", payload: number}
;

export const TodoReducer = (state:Todo[], action: Actions) => {

switch (action.type)
{
    case "add":
        return [...state, {id: Date.now(), todo: action.payload, isDone: false, isCompleted: false}];
    
    case "remove":
        return state.filter((todo)=> todo.id !== action.payload);

    case "done":
        return state.map(todo => todo.id === action.payload? {...todo, isDone: !todo.isDone}:todo);

    case "edit":
            return state.map(todo => todo.id === action.payload.id ? {...todo, todo: action.payload.todo}:todo);

    case "completed":
        return state.map(todo => todo.id === action.payload? {...todo, isCompleted: true}:todo);

    case "active":
        return state.map(todo => todo.id === action.payload? {...todo, isCompleted: false}:todo);
    
    default:
        return state;
}

}



