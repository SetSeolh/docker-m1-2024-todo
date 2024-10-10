import { useRef } from 'react';
import './NewTodo.css';

export default function NewTodo({ajoutTodo}) {
    const refInput = useRef(null);
    const valider = async ()=>{
        console.log("Valider", valider);
        const texte = refInput.current.value;
        if (!texte) {
            return;
        }
        const res = await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                texte,
            })
        });
        const todo = await res.json();
        ajoutTodo(todo);
        refInput.current.value = "";
    };
    return (
        <div className='newTodo'>
            <input type="text" ref={refInput}></input>
            <button onClick={valider}>
                Valider
            </button>
        </div>
    );
};