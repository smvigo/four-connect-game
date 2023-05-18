export const TIME_TURN = 30 * 1000

export const OVERSIZE_BOARD = Symbol()

export const BOARD_SIZE = {
  columns: 7,
  rows: 6
}

export const WIN_NUMBER = 4

export const PLAYERS = [
  {
    default_name: 'player 1',
    default_color: '255, 224, 0'
  },
  {
    default_name: 'player 2',
    default_color: '255, 0, 26'
  }
]

// default_color: '255, 224, 0'
// default_color: '255, 0, 26'

export const GAME_STATES = {
  UNPLAYABLE: Symbol(),
  PLAYER_WIN: Symbol(),
  PLAYABLE: Symbol()
}
