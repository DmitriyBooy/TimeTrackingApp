import { type FC } from 'react'
import Card from './components/Card'
import { useSelector } from 'react-redux'
import { type RootState, useAppDispatch } from '../../store'

import { useEffect } from 'react'

import { Button } from 'antd'

import styles from './CalendarPage.module.scss'
import { addTaskAsync, fetchCalendarData } from './CalendarPageThunks'

const CalendarPage: FC = () => {
  const data = useSelector((state: RootState) => state.calendar.data)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCalendarData())
  }, [dispatch])

  const onAddCard = (): void => {
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
