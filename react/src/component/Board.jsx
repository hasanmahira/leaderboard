import React from "react";



const Board = ({ playerId, username, country, money, rank, dailyDif, prize,
    // name, state, metod,
    dominance_scale = 'global', dominance_precision = 3, // Player profile stuff
    extra_value_func, obj }) => {
    console.log("name", username);
    
    return (

        <tr>
            {rank && <td>{rank}</td>}
            {country && <td>{country}</td>}
            {username && <td>{username}</td>}
            {money && <td>{money}</td>}
            {dailyDif && <td>{dailyDif}</td>}
            {prize && <td>{prize}</td>}

            {/* {extra_value_func && <td>{extra_value_func(obj)}</td>} */}

            {/* {level_id && <td className='td-level-name'>{<LevelLink id={level_id} mastered={mastered} />}</td>}
            {score !== undefined ? <td>{formatDominance(calcDominance(score, dominance_scale), dominance_precision)}</td> : undefined}
            {time && <td>{formatTime(time)}</td>}
            {official_time && <td className={mastered ? 'mastered' : 'not-mastered'}>{formatTime(official_time)}</td>}
            {lb_rank && <td>{formatRank(lb_rank, lb_size)}</td>}
            {update_date && <td>{<DateText date={update_date} />}</td>}
            {steam_id && <td className='td-steam-icon'><SteamProfile id={steam_id} /></td>} */}
        </tr>

    )
}

export default Board;