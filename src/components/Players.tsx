import React, { useState } from 'react';
import styled from 'styled-components';
import Player from '../models/Player';
import { ActionModal as ActionDialog } from './ActionDialog';
import { RoundedButton } from './styles/Buttonts';

interface IProps {
    players: Player[],
    setPlayers: (player: Player[]) => void,
    saveState: (players: Player[]) => void
}

const PlayerImage = styled.img`
    width: 30px;
    height: 30px;
`

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`

const TableRow = styled.tr`
`

const TableCell = styled.td`
    border: 1px solid grey;
`

const ActionButton = styled(RoundedButton)`
    height: 25px;
    width: 25px;
    padding: 0;
`

const OffsetAction = styled(ActionButton)`
    margin-left: 5px;
`

const RobberContent = styled.div`
    display: flex;
    flex-direction: column;
`
const RobberImage = styled.img`
    width: 20px;
    height: 20px;
`

export const Players = ({ players, setPlayers, saveState }: IProps) => {
    const [shownDialogName, setShownDialogName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState({} as Player);

    const getSelectedPlayer = players.find(pl => pl.id === selectedPlayer.id)!;

    const [points, setPoints] = useState(0);
    const [shareWithRobbers, setShareWithRobbers] = useState(false);

    const setPlayerPoints = (players: Player[], player: Player, points: number, shareWithRobbers: boolean) => {
        const robbersOfPlayer = getSelectedPlayer.robbers;

        const updatedPlayers = players
        .map(p => p.id === selectedPlayer.id
            ? { ...p, points: p.points + points, 
                robbers: shareWithRobbers ? [] : p.robbers,
                transactions: [(points > 0 ? 'received' : 'lost') + ' ' + Math.abs(points) + " points", ...p.transactions] }
            : p)
        .map(p => shareWithRobbers && robbersOfPlayer.includes(p.id) ? {
            ...p, points: p.points + Math.ceil(points / 2),
            transactions: [...p.transactions, 'Robbed ' + points + ' points from ' + getSelectedPlayer.color]
        } : p);


        setPlayers(updatedPlayers);

        setPoints(0);

        saveState(updatedPlayers);
    }

    players.sort((a, b) => b.points - a.points)


    const showDialog = (dialogName: string, player: Player) => {
        setSelectedPlayer(player);
        setShownDialogName(dialogName);
    }

    return <div>
        {shownDialogName !== "" && <ActionDialog onClick={() => { setShownDialogName("") }}>
            {shownDialogName === "robbers" && <div>
                <h1>Robbers</h1>
                {players.filter(robber => robber.id !== selectedPlayer.id).map(robber => <div key={robber.id}><RobberImage src={robber.imageUrl} />
                    <input type="checkbox" checked={getSelectedPlayer.robbers.includes(robber.id)}
                        onClick={e => e.stopPropagation()}
                        onChange={e => {
                            const updatedPlayers = players.map(playerToUpdate => {
                                return (playerToUpdate.id === selectedPlayer.id ? {
                                    ...playerToUpdate,
                                    robbers: (e.target as any).checked
                                        ? [...playerToUpdate.robbers, robber.id]
                                        : playerToUpdate.robbers.filter(robberId => robberId !== robber.id)
                                } : playerToUpdate)
                            });
                            setPlayers(updatedPlayers);

                            saveState(updatedPlayers);
                        }} /></div>)}
            </div>}
            {shownDialogName === "points" && <div>
                <h1>Points</h1>
                {getSelectedPlayer.robbers.length > 0 &&
                <>Share points with robbers: <input type="checkbox" checked={shareWithRobbers}
                onClick= {e => e.stopPropagation()}
                onChange={e => {
                    setShareWithRobbers(!shareWithRobbers)
                }}/> </>}
                <input type="number" value={points} autoFocus onClick={e => e.stopPropagation()} onChange={e => setPoints(parseInt(e.target.value, 10))} />
                <ActionButton role="success" onClick={e => {
                    setPlayerPoints(players, getSelectedPlayer, points, shareWithRobbers);
                }}>+</ActionButton>
                <ActionButton role="error" onClick={e => {
                    setPlayerPoints(players, getSelectedPlayer, -points, false);
                }}>-</ActionButton>


                <ul>
                    {getSelectedPlayer.transactions.map((t, index) => <li key={index}>{t}</li>)}
                </ul>
            </div>}
        </ActionDialog>}
        <Table>
            <thead>
                <tr><th>Player</th><th>Rovers</th><th>Points</th><th>Actions</th></tr>
            </thead>
            <tbody>
                {players.map(p => <TableRow key={p.id}>
                    <TableCell><PlayerImage src={p.imageUrl} /></TableCell>
                    <TableCell>{p.robbers.map(roverId => <PlayerImage key={roverId} src={players.find(player => player.id === roverId)!.imageUrl} />)}</TableCell>
                    <TableCell>{p.points}</TableCell>
                    <TableCell>
                        <ActionButton role="error" onClick={() => showDialog("robbers", p)}>R</ActionButton>
                        <OffsetAction role="success" onClick={() => showDialog("points", p)}>P</OffsetAction>
                    </TableCell>
                </TableRow>)}
            </tbody>
        </Table>
    </div>
}

