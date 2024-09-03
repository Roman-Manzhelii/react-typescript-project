import React from "react";
import Todo from "../models/todo";
import { useState } from "react";

type TodosContextObj = {
    items: Todo[];
    addTodo: (text: string) => void;
    removeTodo: (id: string) => void;
}
export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: () => {},
    removeTodo: () => {}
});


const TodosContextProvider: React.FC = (props) => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);
        setTodos(prevState => {
            return prevState.concat(newTodo);
        })
    };

    const removeTodoHandler = (todoId: string) => {
        setTodos(prevState => {
            return prevState.filter(todo => todo.id !== todoId)
        })
    }

    const constextValue: TodosContextObj  = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }
    return <TodosContext.Provider value={constextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodosContextProvider;