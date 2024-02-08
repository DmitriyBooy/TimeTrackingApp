import { type FC } from 'react'

import { Button, Dropdown, type MenuProps } from 'antd'
import { useNavigate } from 'react-router-dom'

// import styles from './Styles.module.css'

const SettingsButton: FC<any> = () => {
  // const [isOpen, setIsOpen] = useState(false)
  //
  const navigator = useNavigate()

  // const buttonRef = useRef<HTMLButtonElement>(null)
  //
  // const onClick = (): void => {
  //   setIsOpen(true)
  // }
  //
  // const onClose = (): void => {
  //   setIsOpen(false)
  // }
  //
  const onItemClick: MenuProps['onClick'] = ({ key }) => {
    navigator({ pathname: `/settings/${key}` })
  }

  const items: MenuProps['items'] = [
    {
      label: 'Заготовки',
      key: 'tempnames'
    }
  ]

  return (
      <Dropdown
          menu={{ items, onClick: onItemClick }}
          trigger={['click']}
      >
        <Button>
          Настройки
        </Button>
      </Dropdown>
  )
}

export default SettingsButton
