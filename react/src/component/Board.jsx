import React from "react";

const Board = ({ playerId, username, country, money, rank, dailyDif,difColor, prize }) => {
    return (
        <tr>
            {rank && <td>{rank}</td>}
            {country && <td>{country}</td>}
            {username && <td>{username}</td>}
            {money && <td>{money}</td>}
            {dailyDif && <td className={difColor}>{dailyDif}</td>}
            {prize && <td>{prize}</td>}
        </tr>
    )
}

export default Board;