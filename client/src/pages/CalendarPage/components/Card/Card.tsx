import { type FC, type MouseEventHandler } from 'react'
import { type CalendarDataItem } from 'types/CalendarTypes'

import Button from 'components/Button'

import styles from './Card.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store'

import moment from 'moment'
import { deleteTaskAsync } from '../../CalendarPageThunks'

const Card: FC<CalendarDataItem> = ({ date, time, rowsCount, id }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onClickHandler = (): void => {
    navigate(`/task/${id}`)
  }

  const onDeleteTask: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    dispatch(deleteTaskAsync(id))
  }

  return (
        <div
            className={styles.card}
            onClick={onClickHandler}
        >
            <div className={styles.header}>
                <span>
                    {
                        moment(new Date(date))
                          .format('DD MMMM yyyy')
                    }
                </span>

                <Button onClick={onDeleteTask}>
                    x
                </Button>
            </div>

            <div className={styles.card_info}>
                <span>
                    {rowsCount}
                </span>

                <span>
                    {time}
                </span>
            </div>
        </div>
  )
}

export default Card
