import { useEffect, useState } from 'react'
import {
  BOARD_SIZE,
  GAME_STATES,
  OVERSIZE_BOARD,
  WIN_NUMBER
} from './config/game'
import './App.css'

function App() {
  const [board, setBoard] = useState(() =>
    getInitialBoardState({
      columns: BOARD_SIZE.columns,
      rows: BOARD_SIZE.rows
    })
  )

  const [gameState, setGameState] = useState(GAME_STATES.PLAYABLE)
  const [turn, setTurn] = useState(0)
  const [winner, setWinner] = useState()

  const isFullBoard = () => {
    return board.every(columns =>
      columns.every(cell => cell.fill_player != null)
    )
  }

  const getColumn = column => {
    const oversize_column = column > BOARD_SIZE.columns - 1

    if (oversize_column) return OVERSIZE_BOARD

    return board.map(row => row.find((_, col_index) => col_index == column))
  }

  const getCell = ({ column, row }) => {
    const oversize_column = column > BOARD_SIZE.columns - 1
    const oversize_row = row > BOARD_SIZE.rows - 1

    if (oversize_column || oversize_row) return OVERSIZE_BOARD

    return board[row][column]
  }

  const isThereAWinner = () => {
    const { LeftToRight, TopToBottom } = getCoordsToTraverseLinearly({
      rows: 9,
      columns: 6
    })
    const { TopLeftToBottomRight, TopRightToBottomLeft } =
      getCoordsToTraverseDiagonally({ rows: 9, columns: 6 })

    const coords_arrays = [
      LeftToRight,
      TopToBottom,
      TopLeftToBottomRight,
      TopRightToBottomLeft
    ]

    const result = coords_arrays
      .map(coords =>
        IsThereAWinnerInTheFollowingCoordinateMatrix(coords, { getCell })
      )
      .find(player => player != null)

    return result
  }

  const checkGameStatus = () => {
    const winner = isThereAWinner()

    if (winner) {
      setGameState(GAME_STATES.PLAYER_WIN)
      return setWinner(winner)
    }

    if (isFullBoard()) {
      setGameState(GAME_STATES.UNPLAYABLE)
    }
  }

  return <></>
}

const getInitialBoardState = ({ columns, rows }) => {
  let initialBoard = []

  for (let currentRow = 0; currentRow < rows; currentRow++) {
    initialBoard.push([])
    for (let currentCol = 0; currentCol < columns; currentCol++) {
      initialBoard[currentRow].push({
        id: crypto.randomUUID(),
        fill_player: null,
        animation: false
      })
    }
  }
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

const IsThereAWinnerInTheFollowingCoordinateMatrix = (
  coord_matrix,
  { getCell }
) => {
  for (let i = 0; i < coord_matrix.length; i++) {
    let player = null
    let count = 0
    for (let j = 0; j < coord_matrix[i].length; j++) {
      const current_cell = getCell({
        row: coord_matrix[i][j].row,
        column: coord_matrix[i][j].column
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

export default App
