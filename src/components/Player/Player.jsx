import React from 'react'
import style from './Player.module.css'
import { FaceSad } from 'akar-icons'

const Player = ({ counter, name, colorFace }) => {
  return (
    <>
      <div className={style.container}>
        <FaceSad
          className={style.icon}
          strokeWidth={1}
          style={{ backgroundColor: colorFace }}
        />
        <p className={style.name}>{name}</p>
        <span className={style.counter}>{counter}</span>
      </div>
    </>
  )
}

export default Player
