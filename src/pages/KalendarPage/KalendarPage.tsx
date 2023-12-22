import Card from './components/Card'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from '../../store'

import { addCard, setData } from './KalendarPageSlice'
import KalendarService from "../../services/KalendarService";
import { useEffect } from "react";


import Button from 'components/Button'

import styles from './KalendarPage.module.scss'

const KalendarPage = () => {
    const data = useSelector((state: RootState) => state.kalendar.data)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setData(KalendarService.getData()))
    }, [dispatch])

    const onAddCard = () => {
        dispatch(addCard(KalendarService.addTask()))
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

export default KalendarPage
