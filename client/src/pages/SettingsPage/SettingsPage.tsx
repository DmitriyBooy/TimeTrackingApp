import React, { type FC } from 'react'

import Tabs from 'components/Tabs'

import { type TabProps } from 'components/Tabs/Tab/Tab'
import { Outlet } from 'react-router-dom'

const SettingsPage: FC = () => {
  const tabs: TabProps[] = [
    {
      id: 1,
      name: 'Tempnames',
      pathname: 'tempnames'
    }
  ]

  return (
    <div>
      <Tabs tabs={tabs}/>

      <Outlet />
    </div>
  )
}

export default SettingsPage
