import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Players } from './components/Players';
import { GameSetup } from './components/GameSetup';
import Player from './models/Player';
import { RoundedButton } from './components/styles/Buttonts';
import styled from 'styled-components';

const DEFAULT_PLAYERS = [
  { id: 1, color:'black', imageUrl: require('./assets/black_player.png'), selected: false , points: 0, robbers: [],  transactions: []},
  { id: 2, color:'blue', imageUrl: require('./assets/blue_player.png'), selected: false, points: 0, robbers: [],  transactions: [] },
  { id: 3, color:'green', imageUrl: require('./assets/green_player.png'), selected: false, points: 0, robbers: [],  transactions: [] },
  { id: 4, color:'pink', imageUrl: require('./assets/pink_player.png'), selected: false, points: 0, robbers: [], transactions: [] },
  { id: 5, color:'red', imageUrl: require('./assets/red_player.png'), selected: false, points: 0, robbers: [], transactions: [] },
  { id: 6, color:'yellow', imageUrl: require('./assets/yellow_player.png'), selected: false, points: 0, robbers: [], transactions: [] },
];

const ResetButton = styled(RoundedButton)`
  margin-top: 20px;
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
    setStarted(!hasStartedGame);
    localStorage.setItem("started", !hasStartedGame ? "true" : "false");
  }

  const resetGame = () => {
    localStorage.removeItem("players");
    localStorage.removeItem("started");
    setStarted(false);
  }

  return (
    <div className="App">
      {hasStartedGame 
        ? <>
          <Players saveState={handleSave} players={players} setPlayers={setPlayers}/> 
          <ResetButton role="error" onClick={resetGame}>Exit</ResetButton>
          </>
        : <GameSetup players={players} setPlayers={setPlayers} onStart={onStart} />
      }
    </div>
  );
}

export default App;
