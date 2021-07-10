import React from 'react';

import Board from './Board';

const List = ({users}) =>  {
    return(
        users.map(user => {
            return <Board name={user.name} state={user.state} key={user.id}/>
        })
    )
}

export default List;