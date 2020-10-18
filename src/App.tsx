import React, {useEffect, useState} from 'react';
import './App.css';
import {Players} from './components/Players';
import {GameSetup} from './components/GameSetup';
import Player from './models/Player';
import {RoundedButton} from './components/styles/Buttonts';
import styled from 'styled-components';

const DEFAULT_PLAYERS = [
    {
        id: 1,
        color: 'Zwart',
        imageUrl: require('./assets/black_player.png'),
        ownRobberImageUrl: require('./assets/black_robber.png'),
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 2,
        color: 'Blauw',
        imageUrl: require('./assets/blue_player.png'),
        ownRobberImageUrl: require('./assets/blue_robber.png'),
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 3,
        color: 'Groen',
        imageUrl: require('./assets/green_player.png'),
        ownRobberImageUrl: require('./assets/green_robber.png'),
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 4,
        color: 'Roos',
        imageUrl: require('./assets/pink_player.png'),
        ownRobberImageUrl: require('./assets/pink_robber.png'),
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 5,
        color: 'Rood',
        imageUrl: require('./assets/red_player.png'),
        ownRobberImageUrl: require('./assets/red_robber.png'),
        selected: false,
        points: 0,
        robbers: [],
        transactions: []
    },
    {
        id: 6,
        color: 'Geel',
        imageUrl: require('./assets/yellow_player.png'),
        ownRobberImageUrl: require('./assets/yellow_robber.png'),
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
        if (!window.confirm('Weet je zeker dat je het spel wil stoppen?')) {
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
