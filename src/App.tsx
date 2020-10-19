import React, {useEffect, useState} from 'react';
import './App.css';
import {Players} from './components/Players';
import {GameSetup} from './components/GameSetup';
import Player from './models/Player';
import {RoundedButton} from './components/styles/Buttonts';
import styled from 'styled-components';

const DEFAULT_PLAYERS: any[] = [
    {
        id: 1,
        color: 'Zwart',
        imageUrl: 'assets/black_player.png',
        ownRobberImageUrl: 'assets/black_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 2,
        color: 'Geel',
        imageUrl: 'assets/yellow_player.png',
        ownRobberImageUrl: 'assets/yellow_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 3,
        color: 'Groen',
        imageUrl: 'assets/green_player.png',
        ownRobberImageUrl: 'assets/green_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 4,
        color: 'Blauw',
        imageUrl: 'assets/blue_player.png',
        ownRobberImageUrl: 'assets/blue_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 5,
        color: 'Roos',
        imageUrl: 'assets/pink_player.png',
        ownRobberImageUrl: 'assets/pink_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 6,
        color: 'Rood',
        imageUrl: 'assets/red_player.png',
        ownRobberImageUrl: 'assets/red_robber.png',
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
];


const ResetButton = styled(RoundedButton)`
  margin-top: 100px;
  margin-left: 80%;
`

function App() {
    const [hasStartedGame, setStarted] = useState(false);

    const [players, setPlayers] = useState<Player[]>(DEFAULT_PLAYERS);

    const handleSave = (playersToSave: Player[]) => {
        localStorage.setItem("players", JSON.stringify(playersToSave));
    }

    useEffect(() => {
        const oldState = localStorage.getItem('players');
        const hasStarted = localStorage.getItem('started') === 'true';
        setStarted(hasStarted);
        setPlayers(oldState ? JSON.parse(oldState!) : DEFAULT_PLAYERS);
    }, []);

    const onStart = () => {
        const selectedPlayers = players.filter(p => p.selected);

        setPlayers(selectedPlayers);
        setStarted(true);

        localStorage.setItem("started", 'true');
        localStorage.setItem("players", JSON.stringify(selectedPlayers))
    }

    const resetGame = () => {
        if (!window.confirm('Weet je zeker dat je het spel wil afronden?')) {
            return;
        }
        localStorage.removeItem("players");
        localStorage.removeItem("started");
        setStarted(false);
        setPlayers(DEFAULT_PLAYERS);
    }

    return (
        <div className="App">
            {hasStartedGame
                ? <>
                    <Players saveState={handleSave} players={players} setPlayers={setPlayers}/>
                    <ResetButton role="error" onClick={resetGame}>Exit</ResetButton>
                </>
                : <GameSetup players={players} setPlayers={setPlayers} onStart={onStart}/>
            }
        </div>
    );
}

export default App;
