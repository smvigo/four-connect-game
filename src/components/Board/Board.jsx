import style from './Board.module.css'

const Board = ({ columns, rows, board, playTurn }) => {
  const getClassNameByFillPlayer = fill_player => {
    if (fill_player == 0) return style['fill-black']
    if (fill_player == 1) return style['fill-white']
    return ''
  }

  return (
    <div className={style['board']}>
      {board.flat().map(square => (
        <div key={square.id} className={style['square-container']}>
          <div className="circle-bottom-border"></div>
          <div
            className={`${style['piece-container']} ${getClassNameByFillPlayer(
              square.fill_player
            )}`}
          ></div>
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
