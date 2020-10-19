import React, { useState } from 'react';
import Player from '../models/Player';
import styled from 'styled-components'
import { RoundedButton } from './styles/Buttonts';

const PlayerImage = styled.img`
    width: 30px;
    height: 30px;
`

const PlayerGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
`
const PlayerCard = styled.div`
    width: calc((100% / 3) - 22px);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid grey;
`

const Checkbox = styled.input`
    margin-top: 10px;
`
const ContentContainer = styled.div`
    padding: 20px;
    text-align: center;
`

interface IProps {
    players: Player[],
    setPlayers: (players: Player[]) => void,
    onStart: () => void
}

export const GameSetup = ({players, setPlayers, onStart} : IProps) => {
    const handleChange = (selectedPlayer: any) => {
        const updatedPlayers = players.map(p => p === selectedPlayer
            ? { ...p, selected: !p.selected }
            : p
        );
        setPlayers(updatedPlayers);
    }

    const showStartAction = players.filter(p => p.selected).length > 1;

    return <div>
        <PlayerGrid>
            {players.map(p => {
                return <PlayerCard key={p.id} onClick={() => handleChange(p)}>
                    <PlayerImage src={require(`../${p.imageUrl}`)} />
                    <Checkbox type="checkbox" checked={p.selected} onChange={() => handleChange(p)} />
                </PlayerCard>
            })
            }
        </PlayerGrid>
        <ContentContainer>
            {showStartAction ? <RoundedButton onClick={onStart}>Start</RoundedButton> : <span>Selecteer minimaal 2 spelers.</span>}
        </ContentContainer>
    </div>
}

