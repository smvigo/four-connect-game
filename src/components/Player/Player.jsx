import style from './Player.module.css'
import { TIME_TURN } from '../../config/game'
import { Clock } from 'akar-icons'

const Player = ({ counter, name, time }) => {
  const percent = time / TIME_TURN
  const timeInSeconds = Math.ceil(time / 1000)
  const applyLowTimeAnimation = percent < 0.25
  const showTime = percent != 1

  return (
    <>
      <div className={style['container']}>
        <div className={style['head']}>
          <img src="" alt="" className={style['profile-image']} />
          <svg className={style['progress-ring']}>
            <circle
              className={style['ring-background']}
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              className={`${style['progress-ring__circle']} ${
                applyLowTimeAnimation && style['progress-ring__low-time']
              }`}
              r="45"
              cx="50"
              cy="50"
              strokeDasharray={Math.PI * 45 * 2}
              strokeDashoffset={calcDashOffset(percent)}
            ></circle>
          </svg>
          {showTime && (
            <span
              className={`${style['time']} ${
                applyLowTimeAnimation && style['time__low-time']
              }`}
            >
              <Clock strokeWidth={1} size={'1rem'} /> {timeInSeconds}s
            </span>
          )}
        </div>
        <p className={style['name']}>{name}</p>
        <span className={style['counter']}>{counter}</span>
      </div>
    </>
  )
}

const calcDashOffset = percent => {
  const dashArray = Math.PI * 45 * 2
  const offset = dashArray * (1 - percent)
  return offset
}

export default Player
