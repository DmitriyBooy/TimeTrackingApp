import {useEffect, useState} from "react";

import RootTheme from './styles/Theme'

import styles from './App.module.scss'
import {useLocation, useOutlet} from "react-router-dom";

const App = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    const Outlet = useOutlet()
    const [currentOutlet, setCurrentOutlet] = useState(Outlet)

    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location);

    const [transitionStage, setTransitionStage] = useState(false)

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage(true)
        }
    }, [location]);

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

    const onAnimationEnd = () => {
        if (transitionStage) {
            setTransitionStage(false);
            setDisplayLocation(location);
            setCurrentOutlet(Outlet)
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

            <div
                className={`${transitionStage ? styles.fadeOut : styles.fadeIn}`}
                onAnimationEnd={onAnimationEnd}
            >
                {currentOutlet}
            </div>
        </div>
    )
}

export default App
