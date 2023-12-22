import {TaskService} from "../../services/TaskService";

import Row from './components/Row'

import styles from './TaskPage.module.scss'
import {useSelector} from "react-redux";

import { selectTaskData } from './TaskPageSelectors'
import { addRow } from './TaskPageSlice'
import { useAppDispatch } from "store";

const TaskPage = () => {
    const dispatch = useAppDispatch()
    const task = useSelector(selectTaskData)

    if (!task) {
        return null
    }

    const { id, date, rows, totalTime } = task

    const onRowAdd = () => {
        const newRow = TaskService.addRow(id)

        if (newRow) {
            dispatch(addRow(newRow))
        }
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

            <button onClick={onRowAdd}>
                +
            </button>
        </div>
    )
}

export default TaskPage
