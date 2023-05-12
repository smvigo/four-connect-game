import React from 'react'
import style from './Player.module.css'
import { FaceSad } from 'akar-icons'

const Player = ({ counter, name, colorFace }) => {
  return (
    <>
      <div className={style.container}>
        <div className={style.profileImage}></div>
        <p className={style.name}>{name}</p>
        <span className={style.counter}>{counter}</span>
      </div>
    </>
  )
}

export default Player
