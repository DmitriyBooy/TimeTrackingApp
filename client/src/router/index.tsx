import { createBrowserRouter } from 'react-router-dom'
import CalendarPage from '../pages/CalendarPage'
import TaskLayout from '../layouts/TaskLayout'
import TaskPage from '../pages/TaskPage'
import SettingsPage from '../pages/SettingsPage'
import App from '../App'
import TempnamesPage from 'pages/SettingsPage/ChildrenPages/TempnamesPage'

export default createBrowserRouter([
  {
    path: '',
    Component: App,
    children: [
      {
        path: '/',
        Component: CalendarPage
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
      },
      {
        path: '/settings',
        Component: SettingsPage,
        children: [
          {
            path: '/settings/tempnames',
            Component: TempnamesPage
          },
          {
            path: '/settings/other',
            element: <div>other</div>
          }
        ]
      }
    ]
  }
])
