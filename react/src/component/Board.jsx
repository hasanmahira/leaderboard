import React from "react";

const Board = ({ name, state, metod }) => {
    return (
        <div className="card">
            <h1>SEA {name} {state}</h1>
            <h3> State: <span className={state}>{state}</span></h3>
            <button onClick={metod}>Durum Değiştir</button>
        </div>
    )
}

export default Board;