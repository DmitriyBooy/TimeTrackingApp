import { createBrowserRouter } from "react-router-dom";
import KalendarPage from "../pages/KalendarPage";
import TaskLayout from "../layouts/TaskLayout";
import TaskPage from "../pages/TaskPage";
import App from "../App";

export default createBrowserRouter([
    {
        path: '',
        Component: App,
        children: [
            {
                path: "/",
                Component: KalendarPage,
            },
            {
                path: '/task',
                Component: TaskLayout,
                children: [
                    {
                        path: '/task/:taskId',
                        Component: TaskPage
                    }
                ]
            }
        ],
    }
]);
