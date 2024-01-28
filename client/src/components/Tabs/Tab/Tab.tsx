import { type FC, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './TabStyles.module.scss'

export interface TabProps {
  id: number
  pathname: string
  name: string
}

const Tab: FC<TabProps> = ({ pathname, name, id }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const [isSelected, setIsSelected] = useState(false)

  const endpoint = location.pathname.split('/').at(-1)

  useEffect(() => {
    if (endpoint !== undefined && endpoint === pathname) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [endpoint])

  const onClick = (): void => {
    navigate({ pathname })
  }

  return (
      <button onClick={onClick} className={`${styles.tab} ${isSelected ? styles.isSelected : ''}`}>
        { name }
      </button>
  )
}

export default Tab
