import {useEffect, useState} from "react";

import RootTheme from './styles/Theme'

import styles from './App.module.scss'
import AnimatedRoutes from "./components/AnimatedRoutes";

const App = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        const isDarkTheme = window?.matchMedia('(prefers-color-scheme: dark)').matches

        setTheme(isDarkTheme ? 'dark' : 'light')
    }, [])

    useEffect(() => {
        const root = document.documentElement

        if (root) {
            const style = root.style

            for (const [key, value] of Object.entries(RootTheme)) {
                style.setProperty(key, value[theme])
            }
        }
    }, [theme])

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    return (
        <div className={styles.container}>
            <button
                onClick={changeTheme}
                className={styles.themeButton}
            >
                { theme }
            </button>

            <AnimatedRoutes />
        </div>
    )
}

export default App
