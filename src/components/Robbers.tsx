import styled from 'styled-components';
import React, {ChangeEvent} from 'react';
import Player from '../models/Player';

interface IProps {
    players: Player[],
    selectedPlayer: Player,
    setPlayers: (players: Player[]) => void,
    saveState: (players: Player[]) => void
}

const RobberGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const RobberCard = styled.div`
    display: flex;
    width: calc((100% / 2) - 22px);;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid grey;
`
const RobberImage = styled.img`
    width: 25px;
    height: 25px;
`

export const Robbers = ({players, selectedPlayer, setPlayers, saveState}: IProps) => {
    const getSelectedPlayer = players.find(pl => pl.id === selectedPlayer.id)!;

    const handleChange = (robber: Player) => {
        {
            const updatedPlayers = players.map(playerToUpdate => {
                return (playerToUpdate.id === selectedPlayer.id ? {
                    ...playerToUpdate,
                    robbers: !getSelectedPlayer.robbers.includes(robber.id)
                        ? [...playerToUpdate.robbers, robber.id]
                        : playerToUpdate.robbers.filter(robberId => robberId !== robber.id)
                } : playerToUpdate)
            });
            setPlayers(updatedPlayers);

            saveState(updatedPlayers);
        }
    }

    const robbers = players.filter(robber => robber.id !== selectedPlayer.id && players.filter(p => p.id !== selectedPlayer.id && p.robbers.includes(robber.id)).length === 0);
    return (
        <RobberGrid>
            {robbers.length > 0 ? robbers.map(robber => <RobberCard onClick={() => handleChange(robber)} key={robber.id}>
                <RobberImage
                    src={robber.ownRobberImageUrl}/>
                <input type="checkbox" checked={getSelectedPlayer.robbers.includes(robber.id)}
                       onChange={() => handleChange(robber)}/></RobberCard>)
            : <p>Er zijn geen rovers beschikbaar.</p>}
        </RobberGrid>
    );
}
