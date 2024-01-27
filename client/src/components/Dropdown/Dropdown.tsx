import { type FC, type MouseEvent, type ReactNode, type RefObject, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import styles from './Dropdown.module.scss'

const bodyRootElement = document.querySelector('body')

interface DropdownProps {
  anchor: RefObject<HTMLElement>
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Dropdown: FC<DropdownProps> = ({ anchor, isOpen, onClose, children }) => {
  const element = useMemo(() => {
    const divElement = document.createElement('div')

    divElement.classList.add('dropdown')

    return divElement
  }, [])

  const onClickHandler = (event: MouseEvent<HTMLDivElement>): void => {
    event.stopPropagation()
    if (isOpen) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      bodyRootElement?.appendChild(element)

      return () => {
        bodyRootElement?.removeChild(element)
      }
    }
  }, [isOpen])

  const height = anchor.current?.offsetHeight ?? 0
  const top = anchor.current?.offsetTop ?? 0
  const left = anchor.current?.offsetLeft ?? 0

  const dropdownStyles = {
    top: top + height,
    left
  }

  return isOpen
    ? createPortal(
        <div
            className={styles.container}
            onClick={onClickHandler}
        >
            <div
                className={styles.dropdown}
                onClick={(event) => { event.stopPropagation() }}
                style={dropdownStyles}
            >
                {children}
            </div>
        </div>,
        element)
    : null
}

export default Dropdown
