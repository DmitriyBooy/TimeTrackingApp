import Card from './components/Card'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from '../../store'

import { addCard, setData } from './CalendarPageSlice'
import CalendarService from "services/CalendarService";
import { useEffect } from "react";


import Button from 'components/Button'

import styles from './CalendarPage.module.scss'
import {addTaskAsync, fetchCalendarData} from "./CalendarPageThunks";

const CalendarPage = () => {
    const data = useSelector((state: RootState) => state.calendar.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCalendarData())
    }, [dispatch])

    const onAddCard = () => {
        dispatch(addTaskAsync())
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                KalendarPage

                <Button onClick={onAddCard}>
                    +
                </Button>
            </div>

            <div className={styles.tasksContainer}>
                {
                    data.map((item) =>
                        <Card key={item.id} {...item} />
                    )
                }
            </div>
        </div>
    )
}

export default CalendarPage
