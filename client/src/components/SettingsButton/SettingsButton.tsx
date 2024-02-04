import { type FC, useRef, useState } from 'react'

import Button from 'components/Button'
import DropdownList, { type DropdownListItemType } from '../DropdownList'
import { useNavigate } from 'react-router-dom'

import styles from './Styles.module.css'

const SettingsButton: FC<any> = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigator = useNavigate()

  const buttonRef = useRef<HTMLButtonElement>(null)

  const onClick = (): void => {
    setIsOpen(true)
  }

  const onClose = (): void => {
    setIsOpen(false)
  }

  const onItemClick = ({ id }: DropdownListItemType): void => {
    navigator({ pathname: `/settings/${id}` })
  }

  const items: DropdownListItemType[] = [
    {
      label: 'Заготовки',
      id: 'tempnames'
    }
  ]

  return (
      <>
        <Button
            onClick={onClick}
            ref={buttonRef}
            className={styles.button}
        >
          Настройки
        </Button>

        <DropdownList
            anchor={buttonRef}
            isOpen={isOpen}
            onClose={onClose}
            onItemClick={onItemClick}
            items={items}
        />
      </>
  )
}

export default SettingsButton
