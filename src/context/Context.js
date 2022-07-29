import { createContext, useContext, useReducer } from "react";
import { TodoReducer } from "./reducer";

const TodoContext = createContext();

const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, []);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoProvider };

export const TodoState = () => {
  return useContext(TodoContext);
};
