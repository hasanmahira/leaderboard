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
                    {users.map((l, i) => <Board key={i} {...l}
                        dominance_scale={dominance_scale}
                        dominance_precision={dominance_precision}
                        obj={l}
                        extra_value_func={extra_value_func} />)}
                </tbody>
            </table>
        </div>
    )
}

export default List;