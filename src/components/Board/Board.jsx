import style from './Board.module.css'
import Piece from '../Piece/Piece'

const Board = ({ board, playTurn }) => {
  return (
    <div className={style['board']}>
      {board.flat().map(square => (
        <div key={square.id} className={style['square-container']}>
          <div className="circle-bottom-border"></div>
          <div className={style['piece-container']}>
            {square.fill_player != null && (
              <Piece fillPlayer={square.fill_player}></Piece>
            )}
          </div>
          <div className={style['circle-ring']}></div>
          <div
            className={style['square-background']}
            onClick={() => playTurn(square.column)}
          ></div>
        </div>
      ))}
    </div>
  )
}

export default Board
