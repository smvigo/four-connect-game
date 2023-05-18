import './App.css'
import Button from './components/Button'
import Player from './components/Player'
import { BOARD_SIZE, PLAYERS } from './config/game'
import Board from './components/Board/Board'
import useBoard from './hooks/useBoard'
import Piece from './components/Piece'
import Modal from './components/Modal'
import { useState, useMemo, useEffect } from 'react'

function App() {
  const { ResetGame, PlayTurn, board, state, turn, winCount, winner, time } =
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
      <Modal />
      <div className="head">
        <button
          onClick={() => {
            const customEvent = new CustomEvent('custom-modal', {
              detail: <ContentModal />
            })

            document.dispatchEvent(customEvent)
          }}
        >
          Open Modal
        </button>
      </div>
      <div className="board-with-players">
        <Player
          name={PLAYERS[0].default_name}
          counter={winCount[0]}
          time={time[0]}
        ></Player>
        <Board board={board} playTurn={PlayTurn}></Board>
        <Player
          name={PLAYERS[1].default_name}
          counter={winCount[1]}
          time={time[1]}
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

const ContentModal = () => {
  return (
    <>
      <p>
        {`I'm a modal window, I don't use portals but use the dialog element
    from the platform.`}
      </p>
      <p>
        {`Also tabbing is locked inside me go ahead and try tabbing to the
    button behind me.`}
      </p>
      <button
        onClick={() => {
          const customEvent = new CustomEvent('custom-modal', {
            detail: undefined
          })

          document.dispatchEvent(customEvent)
        }}
      >
        Close
      </button>
    </>
  )
}

export default App
