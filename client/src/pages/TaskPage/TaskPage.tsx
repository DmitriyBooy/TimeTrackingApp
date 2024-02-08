import { type FC } from 'react'

import Row from './components/Row'

import styles from './TaskPage.module.scss'
import { useSelector } from 'react-redux'

import { selectTaskData } from './TaskPageSelectors'
import { useAppDispatch } from 'store'
import { addTaskRowAsync } from './TaskPageThunks'
import { Button } from 'antd'

const TaskPage: FC = () => {
  const dispatch = useAppDispatch()
  const task = useSelector(selectTaskData)

  if (task === null) {
    return null
  }

  const { id, rows } = task

  const onRowAdd = (): void => {
    dispatch(addTaskRowAsync(id))
  }

  return (
        <div className={styles.container}>
            <div className={styles.rowsContainer}>
                {
                    rows.map((row) =>
                        <Row
                            key={row.id}
                            {...row}
                        />
                    )
                }
            </div>

            <Button onClick={onRowAdd}>
                + Добавить строку
            </Button>
        </div>
  )
}

export default TaskPage
