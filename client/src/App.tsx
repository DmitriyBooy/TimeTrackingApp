import { type FC } from 'react'

import styles from './App.module.scss'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import SettingsButton from './components/SettingsButton'
import Button from './components/Button'

const App: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onBack = (): void => {
    navigate(-1)
  }

  return (
        <div className={styles.container}>
          <div className={styles.topBar}>
            {
              pathname !== '/' && (
                    <Button onClick={onBack}>
                      &#8592; Назад
                    </Button>
              )
            }

            <SettingsButton />
          </div>

          <Outlet/>
        </div>
  )
}

export default App
