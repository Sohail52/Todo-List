import "./App.css";
import { TbArrowBarDown } from 'react-icons/tb';
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";

const App = () => {
    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [editingId, setEditingId] = useState(null); 

    
    const addTodo = (e) => {
        e.preventDefault();

        if (editingId !== null) {
            
            const updatedTodos = allTodos.map(todoItem => {
                if (todoItem.id === editingId) {
                    return {
                        ...todoItem,
                        text: todo
                    };
                }
                return todoItem;
            });
            setAllTodos(updatedTodos);
            setEditingId(null); 
        } else {
            
            const todoItem = {
                id: new Date().getTime(),
                text: todo,
                isChecked: false
            };

            if(todo.trim() !== "") {
                setAllTodos([...allTodos, todoItem]); 
                setTodo("");
            }
        }
    };

    
    const editTodo = (id) => {
        const todoToEdit = allTodos.find(todoItem => todoItem.id === id);
        if (todoToEdit) {
            setTodo(todoToEdit.text); 
            setEditingId(id);
        }
    };

    
    const getAllTodos = () => {
        let stored = JSON.parse(localStorage.getItem("todo"));

        if(stored) {
            setAllTodos(stored);
        }
    };

    
    const toggleChecked = (id) => {
        let updatedTodos = [...allTodos].map(todo => {
            if(todo.id === id){
                todo.isChecked = !todo.isChecked;
            }
            return todo;
        });

        setAllTodos(updatedTodos);
    };

    
    const deleteTodo = (id) => {
        const filteredTodo = allTodos.filter(todo => todo.id !== id);
        setAllTodos(filteredTodo);
    };

    
    const cancelEdit = () => {
        setTodo("");
        setEditingId(null);
    };

    
    useEffect(() => {
        getAllTodos();
    }, []);

    
    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(allTodos));
    }, [allTodos]);

    return (
        <div className="App">
            
            <header className="App_header">
                <h1>Todo List App</h1>
            </header>

            <div className="App_todo">
                <form className="App_input_wrapper" onSubmit={addTodo}>
                    <input 
                        type="text" 
                        className="App_input" 
                        placeholder="Enter your task..."
                        value={todo} 
                        onChange={(e) => setTodo(e.target.value)} 
                    />
                    <div className="App_input_button" onClick={addTodo}>
                        <TbArrowBarDown size={24} />
                    </div>
                </form>

                <div className="App_todo_list">
                    {
                        allTodos.map(todo => (
                            <ListItem 
                                key={todo.id} 
                                deleteTodo={() => deleteTodo(todo.id)} 
                                editTodo={() => editTodo(todo.id)} 
                                text={todo.text} 
                                isChecked={todo.isChecked} 
                                toggleChecked={() => toggleChecked(todo.id)} 
                            />
                        ))
                    }

                    {
                        allTodos.length === 0 && (
                            <p className="empty">There are no Todos</p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
