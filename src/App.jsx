import { useEffect, useState } from 'react'
import './App.css'
import Button from './components/Button'
import Player from './components/Player'
import { BOARD_SIZE, PLAYERS } from './config/game'
import Board from './components/Board/Board'
import useBoard from './hooks/useBoard'

function App() {
  const { ResetGame, PlayTurn, board, state, turn, winCount, winner } =
    useBoard()

  return (
    <div
      className="main"
      style={{
        '--columnNumber': BOARD_SIZE.columns,
        '--rowNumber': BOARD_SIZE.rows,
        '--playerZeroColor': PLAYERS[0].default_color,
        '--playerOneColor': PLAYERS[1].default_color
      }}
    >
      <div className="board-with-players">
        <Player
          colorFace={PLAYERS[0].default_color}
          name={PLAYERS[0].default_name}
          counter={winCount[0]}
        ></Player>
        <Board
          columns={BOARD_SIZE.columns}
          rows={BOARD_SIZE.rows}
          board={board}
          playTurn={PlayTurn}
        ></Board>
        <Player
          colorFace={PLAYERS[1].default_color}
          name={PLAYERS[1].default_name}
          counter={winCount[1]}
        ></Player>
      </div>
      <div className="background-gradient">
        <div className="left-gradient"></div>
        <div className="right-gradient"></div>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
