import { createBrowserRouter } from "react-router-dom";
import CalendarPage from "../pages/CalendarPage";
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
                Component: CalendarPage,
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
