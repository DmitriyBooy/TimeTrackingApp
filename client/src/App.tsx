import { type FC } from 'react'

import styles from './App.module.scss'
import { Link, Outlet } from 'react-router-dom'

const App: FC = () => {
  return (
        <div className={styles.container}>
          <Link to={{ pathname: '/settings' }}>
            <button>
              Settings
            </button>
          </Link>

          <Outlet/>
        </div>
  )
}

export default App
