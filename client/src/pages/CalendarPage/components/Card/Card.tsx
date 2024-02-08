import { type FC, type MouseEventHandler, type ReactNode } from 'react'
import { type CalendarDataItem } from 'types/CalendarTypes'

import { Button, Card as AntCard } from 'antd'
import { CloseOutlined, EditOutlined } from '@ant-design/icons'

import styles from './Card.module.scss'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'store'

import moment from 'moment'
import { deleteTaskAsync } from '../../CalendarPageThunks'

const Card: FC<CalendarDataItem> = ({ date, time, rowsCount, id }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onEditClick = (): void => {
    navigate(`/task/${id}`)
  }

  const onDeleteTask: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()

    dispatch(deleteTaskAsync(id))
  }

  const cardExtra: ReactNode = (
      <Button onClick={onDeleteTask}>
        <CloseOutlined />
      </Button>
  )

  return (
        <AntCard
            title={moment(new Date(date)).format('DD MMMM yyyy')}
            extra={cardExtra}
            actions={[
              <EditOutlined onClick={onEditClick} key="edit" />
            ]}
        >
            <div className={styles.card_info}>
                <span>
                    {rowsCount}
                </span>

                <span>
                    {time}
                </span>
            </div>
        </AntCard>
  )
}

export default Card
