import {Route, Routes, useNavigate, useParams} from 'react-router-dom'
import TaskPage from 'pages/TaskPage'
import Button from "../../components/Button";
import styles from './TaskLayout.module.scss'
import {useSelector} from "react-redux";
import {selectTaskData} from "../../pages/TaskPage/TaskPageSelectors";
import {useEffect} from "react";
import {setData} from "../../pages/TaskPage/TaskPageSlice";
import {TaskService} from "../../services/TaskService";
import {useAppDispatch} from "../../store";
import moment from "moment";

const TaskLayout = () => {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()
    const task = useSelector(selectTaskData)

    const { taskId } = useParams<{ taskId: string }>()

    useEffect(() => {
        if (taskId) {
            dispatch(setData(TaskService.getTask(+taskId) || null))
        }
    }, [taskId])

    if (!task) {
        return null
    }

    const toKalendar = () => {
        navigate('/')
    }

    const taskDate = task
    ? moment(new Date(task.date)).format('DD MMMM yyyy')
        : ''

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Button
                    onClick={toKalendar}
                    className={styles.backButton}
                >
                    <span className={styles.text}>
                        &#8592; К календарю
                    </span>
                </Button>

                <span className={styles.taskDate}>
                    {taskDate}
                </span>
            </div>

            <Routes>
                <Route
                    path=""
                    Component={TaskPage}
                />
            </Routes>
        </div>
    )
}

export default TaskLayout
