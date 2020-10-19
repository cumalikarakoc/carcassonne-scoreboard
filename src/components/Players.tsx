import React, { useState } from 'react';
import styled from 'styled-components';
import Player from '../models/Player';
import { ActionModal as ActionDialog } from './ActionDialog';
import { RoundedButton } from './styles/Buttonts';
import {Robbers} from './Robbers';

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

const TableRow = styled.tr<any>`
    background-color: ${props => props.selected && 'rgba(0,0,0,0.3)'}
`

const TableCell = styled.td`
    padding: 5px;
    border: 1px solid grey;
`
const ActionButton = styled(RoundedButton)`
    height: 35px;
    width: 35px;
    padding: 0;
`

const PointsInput = styled.input`
    width: 100%;
    height: 30px;
    font-size: 1rem;
    box-sizing: border-box;
`

const TransactionListItem = styled.li`
    text-align: left;
`

const TransactionList = styled.ul`
    max-height: 200px;
    overflow: auto;
    border: 1px solid black;
    padding: 5px 25px;
    margin-top: 0;
`
const TransactionListTitle = styled.span`
    display: block;
    margin-top: 10px;
    font-weight: bold;
`
const ActionButtons = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 4px;
`

const SharePointsOption = styled.span`
    display: block;
    padding: 5px;
`

export const Players = ({ players, setPlayers, saveState }: IProps) => {
    const [shownDialogName, setShownDialogName] = useState("");
    const [selectedPlayer, setSelectedPlayer] = useState({} as Player);

    const getSelectedPlayer = players.find(pl => pl.id === selectedPlayer.id)!;

    const [points, setPoints] = useState<any>(undefined);
    const [shareWithRobbers, setShareWithRobbers] = useState(false);

    const setPlayerPoints = (players: Player[], player: Player, points: number, shareWithRobbers: boolean) => {
        if(!(points as number)){
            return;
        }
        const robbersOfPlayer = getSelectedPlayer.robbers;

        const updatedPlayers = players
        .map(p => p.id === selectedPlayer.id
            ? { ...p, points: p.points + points,
                robbers: shareWithRobbers ? [] : p.robbers,
                transactions: [Math.abs(points) + ' punten ' + (points > 0 ? 'ontvangen' : 'verloren'), ...p.transactions] }
            : p)
        .map(p => shareWithRobbers && robbersOfPlayer.includes(p.id) ? {
            ...p, points: p.points + Math.ceil(points / 2),
            transactions: [Math.ceil(points / 2) + ' punten gejat van ' + getSelectedPlayer.color, ...p.transactions]
        } : p);


        setPlayers(updatedPlayers);

        setPoints(undefined);

        setShareWithRobbers(false)

        saveState(updatedPlayers);
    }

    players.sort((a, b) => b.points - a.points)


    const showDialog = (dialogName: string, player: Player) => {
        setSelectedPlayer(player);
        setShownDialogName(dialogName);
    }

    return <div>
        {shownDialogName !== "" && <ActionDialog title={shownDialogName} closeDialog={() => { setShownDialogName(""); setPoints(undefined) }}>
            {shownDialogName === "Rovers" && <Robbers players={players} selectedPlayer={selectedPlayer} setPlayers={setPlayers} saveState={saveState} />}
            {shownDialogName === "Punten" && <div>
                {getSelectedPlayer.robbers.length > 0 &&
                <SharePointsOption><label htmlFor="shareWithRobbers">Share points with robbers:</label><input type="checkbox" id="shareWithRobbers" checked={shareWithRobbers}
                onChange={e => {
                    setShareWithRobbers(!shareWithRobbers)
                }}/> </SharePointsOption>}
                <PointsInput type="number" value={points || ''} onChange={e => setPoints(parseInt(e.target.value, 10))} />
                <ActionButtons>
                    <ActionButton role="success" onClick={e => {
                        setPlayerPoints(players, getSelectedPlayer, points, shareWithRobbers);
                    }}>+</ActionButton>
                    <ActionButton role="error" onClick={e => {
                        setPlayerPoints(players, getSelectedPlayer, -points, false);
                    }}>-</ActionButton>
                </ActionButtons>

                <TransactionListTitle>Transacties</TransactionListTitle>
                <TransactionList>
                    {getSelectedPlayer.transactions.length > 0 ? getSelectedPlayer.transactions.map((t, index) => <TransactionListItem key={index}>{t}</TransactionListItem>)
                        : <p>Geen transacties gevonden.</p>}
                </TransactionList>
            </div>}
        </ActionDialog>}
        <Table>
            <thead>
                <tr><th>Speler</th><th>Rovers</th><th>Punten</th></tr>
            </thead>
            <tbody>
                {players.map(p =>
                        <TableRow key={p.id} selected={shownDialogName !== '' && p.id === selectedPlayer.id}>
                        <TableCell><PlayerImage src={require(`../${p.imageUrl}`)} /></TableCell>
                        <TableCell onClick={() => showDialog("Rovers", p)}>{p.robbers.map(roverId =>
                            <PlayerImage key={roverId} src={require(`../${players.find(player => player.id === roverId)!.ownRobberImageUrl}`)} />)}</TableCell>
                        <TableCell onClick={() => showDialog("Punten", p)}>{p.points}</TableCell>
                    </TableRow>
                )}
            </tbody>
        </Table>
    </div>
}

