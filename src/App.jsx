import './App.css'
import Player from './components/Player'
import { BOARD_SIZE, PLAYERS } from './config/game'
import Board from './components/Board/Board'
import useBoard from './hooks/useBoard'
import { useModal } from './components/Modal/Modal'

function App() {
  const { PlayTurn, board, winCount, time } = useBoard()
  const { openModalContent, contentModal } = useModal()

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
      {contentModal}
      <div className="head">
        <button onClick={openModalContent}>Open Modal</button>
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

export default App
