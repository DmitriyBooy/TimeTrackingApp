import { type FC } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import styles from './TaskLayout.module.scss'
import { useSelector } from 'react-redux'
import { selectTaskData } from '../../pages/TaskPage/TaskPageSelectors'
import { useEffect } from 'react'
import { getTaskAsync } from '../../pages/TaskPage/TaskPageThunks'
import { useAppDispatch } from '../../store'
import moment from 'moment'

const TaskLayout: FC = () => {
  const dispatch = useAppDispatch()

  const task = useSelector(selectTaskData)

  const { taskId } = useParams<{ taskId: string }>()

  useEffect(() => {
    if (taskId !== undefined) {
      dispatch(getTaskAsync(+taskId))
    }
  }, [taskId])

  if (task === null) {
    return null
  }

  const taskDate = moment(new Date(task.date)).format('DD MMMM yyyy')

  return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.taskDate}>
                    {taskDate}
                </span>
            </div>

            <Outlet />
        </div>
  )
}

export default TaskLayout
