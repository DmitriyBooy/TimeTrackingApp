import {useLocation, Routes, Route} from "react-router-dom";

import {useEffect, useState} from "react";

import './AnimatedRoutes.css'
import TaskLayout from "../../layouts/TaskLayout";
import KalendarPage from "../../pages/KalendarPage";

const AnimatedRoutes = () => {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location);

    const [transitionStage, setTransistionStage] = useState("fadeIn")

    useEffect(() => {
        if (location !== displayLocation) {
            setTransistionStage("fadeOut")
        }
    }, [location, displayLocation]);

    return (
        <div
            className={`${transitionStage}`}
            onAnimationEnd={() => {
                if (transitionStage === "fadeOut") {
                    setTransistionStage("fadeIn");
                    setDisplayLocation(location);
                }
            }}
        >
            <Routes location={displayLocation}>
                <Route path='' Component={KalendarPage} />

                <Route path="task/:taskId" Component={TaskLayout} />
            </Routes>
        </div>
    )
}

export default AnimatedRoutes
