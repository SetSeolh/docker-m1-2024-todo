import { useState } from "react";

export default function Todo({todo, deleteTodo, changeCheckTodo}) {
    const [checked, setChecked] = useState(todo.checked);

    const onChangeChecked = async (e)=>{
        changeCheckTodo(todo, e.target.checked);
        setChecked(e.target.checked);
    }

    return (
        <div className={`todo ${todo.checked ? 'checked' : ''}`}>
            <label>
                <input type="checkbox" checked={checked} onChange={onChangeChecked}></input>
                <span>{todo.texte}</span>
            </label>
            <button onClick={()=>deleteTodo(todo)}>
                Delete
            </button>
        </div>
    )
}