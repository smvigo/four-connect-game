import { useEffect, useState } from 'react'
import {
  BOARD_SIZE,
  GAME_STATES,
  OVERSIZE_BOARD,
  WIN_NUMBER
} from './config/game'

const useBoard = () => {
  const [game, setGame] = useState(() => resetGameState())

  useEffect(() => {
    checkGameState(game, setGame)
  }, [game.board])

  const ResetGame = () => {
    setGame(resetGameState())
  }

  const PlayTurn = column => {
    const arrColumn = getColumn({ column, game })

    const squareToInsert = arrColumn.findLast(
      square => square.fill_player === null
    )

    if (squareToInsert == null) return

    const new_board = game.board.map(row =>
      row.map(cell => {
        return {
          ...cell,
          fill_player:
            squareToInsert.column == cell.column &&
            squareToInsert.row == cell.row
              ? game.turn
              : cell.fill_player
        }
      })
    )

    setGame(currentState => {
      return {
        ...currentState,
        board: new_board,
        turn: currentState.turn == 0 ? 1 : 0
      }
    })
  }

  return {
    ...game,
    ResetGame,
    PlayTurn
  }
}

const TRAVERSE_COORDS = (() => {
  const { LeftToRight, TopToBottom } = getCoordsToTraverseLinearly({
    rows: 9,
    columns: 6
  })
  const { TopLeftToBottomRight, TopRightToBottomLeft } =
    getCoordsToTraverseDiagonally({ rows: 9, columns: 6 })

  return {
    LeftToRight,
    TopToBottom,
    TopLeftToBottomRight,
    TopRightToBottomLeft
  }
})()

const getCell = ({ column, row, game }) => {
  const oversize_column = column > BOARD_SIZE.columns - 1
  const oversize_row = row > BOARD_SIZE.rows - 1

  if (oversize_column || oversize_row) return OVERSIZE_BOARD

  return game.board[row][column]
}

const isThereAWinner = ({ getCell, game }) => {
  const result = TRAVERSE_COORDS.map(coords =>
    IsThereAWinnerInTheFollowingCoordinateMatrix(coords, { getCell, game })
  ).find(player => player != null)

  return result
}

const IsThereAWinnerInTheFollowingCoordinateMatrix = (
  coord_matrix,
  { getCell, game }
) => {
  for (let i = 0; i < coord_matrix.length; i++) {
    let player = null
    let count = 0
    for (let j = 0; j < coord_matrix[i].length; j++) {
      const current_cell = getCell({
        row: coord_matrix[i][j].row,
        column: coord_matrix[i][j].column,
        game
      })

      if (current_cell.fill_player === player) count++

      if (current_cell.fill_player !== player) {
        player = current_cell.fill_player
        count = 1
      }

      if (count === WIN_NUMBER && player !== null) return player
    }
  }
  return null
}

const checkGameState = (game, setGame) => {
  const winnerPlayer = isThereAWinner({ game, getCell })

  if (winnerPlayer != null) {
    const newWinCount = [
      game.winCount[0] + (winnerPlayer == 0 ? 1 : 0),
      game.winCount[1] + (winnerPlayer == 1 ? 1 : 0)
    ]

    setGame(currentState => {
      return {
        ...currentState,
        state: GAME_STATES.PLAYER_WIN,
        winCount: newWinCount,
        winner: winnerPlayer
      }
    })
  }

  if (isFullBoard(game)) {
    setGame(currentState => {
      return {
        ...currentState,
        state: GAME_STATES.UNPLAYABLE
      }
    })
  }
}

const resetGameState = (turn = 0, winCount = [0, 0]) => {
  const boardState = getInitialBoardState({
    columns: BOARD_SIZE.columns,
    rows: BOARD_SIZE.rows
  })
  return {
    board: boardState,
    state: GAME_STATES.PLAYABLE,
    turn,
    winCount,
    winner: null
  }
}

const isFullBoard = game => {
  return game.board.every(columns =>
    columns.every(cell => cell.fill_player != null)
  )
}

const getColumn = ({ column, game }) => {
  const oversize_column = column > BOARD_SIZE.columns - 1

  if (oversize_column) return OVERSIZE_BOARD

  return game.board.map(row => row.find((_, col_index) => col_index == column))
}

const getInitialBoardState = ({ columns, rows }) => {
  let initialBoard = []

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    initialBoard.push([])
    for (let currentCol = 0; currentCol < columns; currentCol++) {
      initialBoard[currentRow].push({
        id: crypto.randomUUID(),
        fill_player: null,
        animation: false,
        row: currentRow,
        column: currentCol
      })
    }
  }
  return initialBoard
}

const getCoordsToTraverseDiagonally = ({ rows, columns }) => {
  const coordsTopLeftToBottomRight = Array(rows + columns - 1)
  const coordsTopRightToBottomLeft = Array(rows + columns - 1)

  for (let i = 0; i < rows + columns - 1; i++) {
    coordsTopLeftToBottomRight[i] = []
    coordsTopRightToBottomLeft[i] = []

    for (let j = 0; j < rows + columns - 1; j++) {
      const k = i - j
      if (k >= 0 && k < rows && j < columns) {
        coordsTopLeftToBottomRight[i].push({ row: k, column: j })
      }
      if (k >= 0 && k < rows && columns - j > 0) {
        coordsTopRightToBottomLeft[i].push({ row: k, column: columns - j - 1 })
      }
    }
  }

  return {
    TopLeftToBottomRight: coordsTopLeftToBottomRight,
    TopRightToBottomLeft: coordsTopRightToBottomLeft
  }
}

const getCoordsToTraverseLinearly = ({ rows, columns }) => {
  const coordsLeftToRight = []

  for (let i = 0; i < rows; i++) {
    coordsLeftToRight[i] = []
    for (let j = 0; j < columns; j++) {
      coordsLeftToRight[i][j] = { row: i, column: j }
    }
  }

  const coordsTopToBottom = coordsLeftToRight[0].map((_, columnIndex) =>
    coordsLeftToRight.map(row => row[columnIndex])
  )

  return {
    LeftToRight: coordsLeftToRight,
    TopToBottom: coordsTopToBottom
  }
}

export default useBoard
