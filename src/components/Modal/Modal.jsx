import style from './Modal.module.css'
import { useRef, useCallback, useEffect, useState } from 'react'

const Modal = ({ ...props }) => {
  const modalRef = useRef(null)
  const [contentModal, setContentModal] = useState()

  const onAnimEnd = useCallback(({ target }) => {
    const hasExitAnimation = target.classList.contains(style['modal--closing'])

    if (hasExitAnimation) return setContentModal()
  }, [])

  useEffect(() => {
    const callback = evt => {
      if (!evt.detail)
        return modalRef.current.classList.add(style['modal--closing'])
      setContentModal(evt.detail)
    }

    document.addEventListener('custom-modal', callback)

    return () => document.removeEventListener('custom-modal', callback)
  }, [])

  useEffect(() => {
    const { current: el } = modalRef
    if (contentModal) el.showModal()
  }, [contentModal])

  if (!contentModal) return null

  return (
    <dialog
      ref={modalRef}
      className={style.modal}
      onClick={e => onCloseWithAnimation(e, { modalRef })}
      onCancel={e => onCloseWithAnimation(e, { modalRef })}
      onAnimationEnd={onAnimEnd}
      {...props}
    >
      <div className={style['modal__container']}>{contentModal}</div>
    </dialog>
  )
}

const onCloseWithAnimation = (e, { modalRef }) => {
  e.preventDefault()
  modalRef.current.classList.add(style['modal--closing'])
}

export default Modal
