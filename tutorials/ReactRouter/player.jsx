import React from 'react';

const Player = (props) => {
    const player = null;
    const id = props.match.params.number;

    if (!player) {
        return <div>Sorry, but the player with id {id} was not found</div>
    }
    return (
        <div>
            <h1>{player.name} (#{player.number})</h1>
            <h2>{player.position}</h2>
        </div>
    )
}

export default Player;