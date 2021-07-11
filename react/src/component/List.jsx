import React from 'react';

import Board from './Board';

const List = ({ users,
    dominance_scale = 'global', dominance_precision = 3, extra_header, extra_value_func }) => {
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Country</th>
                        <th>Username</th>
                        <th>Money</th>
                        <th>Daily Diff</th>
                        <th>Prize</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {users.map((l, i) => <Board name={users.username} state={users[0].money} key={users[0].playerid} />)} */}
                    {users.map((l, i) => <Board key={i} {...l}
                        dominance_scale={dominance_scale}
                        dominance_precision={dominance_precision}
                        obj={l}
                        extra_value_func={extra_value_func} />)}
                </tbody>
            </table>
        </div>

        //     <div>
        //     {/* { changePage && 
        //         <div>
        //         <button onClick={(event) => changePage(event, 'previous') } disabled={start_rank < lines.length || loading}>Previous</button>
        //         <button onClick={(event) => changePage(event, 'next')} disabled={loading}>Next</button> 
        //         </div> } */}
        // </div>


        // users.map(user => {
        //     // return <Board name={user.username} state={user.money} key={user.playerid}/>
        // })
    )
}

export default List;