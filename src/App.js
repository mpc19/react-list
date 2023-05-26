import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [updating, setUpdating] = useState(false);
  const [categories] = useState([
    "Red",
    "Green",
    "Blue",
    "None",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("Red");

  function addTodo() {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          category: selectedCategory,
          completed: false,
          updating: false,
        },
      ]);
      setNewTodo("");
      setSelectedCategory("None");
    }
  }

  function setCategory(id, newCategory) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, category: newCategory } : todo
      )
    );
  }

  function updateTodo(id, newText) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleUpdating(id) {
    setUpdating(!updating);
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, updating: !todo.updating, completed: false }
          : todo
      )
    );
  }

  return (
    <div className="App">
      <h1>React To-Do App</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Add a task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? addTodo() : null)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <div className="input-group" key={todo.id}>
            {!todo.updating ? (
              <div className="todo-item">
                <input
                  type="checkbox"
                  disabled={todo.updating && updating ? true : false}
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className="todo-item__text" style={{ textDecoration: todo.completed ? 'line-through' : 'none'}}>{todo.text}</span>
                <button
                  className={`${todo.category.toLowerCase()}`}
                  onClick={() => toggleUpdating(todo.id)}
                >
                  Edit
                </button>
                <button
                  className={`${todo.category.toLowerCase()}`}
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div>
                <input
                  className="todo-item"
                  type="text"
                  value={todo.text}
                  onChange={(e) => updateTodo(todo.id, e.target.value)}
                />
                <select
                  value={todo.category}
                  onChange={(e) => setCategory(todo.id, e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button className="edit" onClick={() => toggleUpdating(todo.id)}>Save</button>
                <button className="edit" onClick={() => deleteTodo(todo.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
