import { type FC, useEffect, useState } from 'react'

import Tabs from 'components/Tabs'

import { type TabProps } from 'components/Tabs/Tab/Tab'
import { useOutlet } from 'react-router-dom'

const SettingsPage: FC = () => {
  const Outlet = useOutlet()
  const [currentOutlet, setCurrentOutlet] = useState(Outlet)

  useEffect(() => {
    setCurrentOutlet(Outlet)
  }, [])

  const tabs: TabProps[] = [
    {
      id: 1,
      name: 'Tempnames',
      pathname: 'tempnames'
    },
    {
      id: 2,
      name: 'Other',
      pathname: 'other'
    }
  ]

  console.log(currentOutlet)

  return <div>
    <Tabs tabs={tabs}/>

    { currentOutlet }
  </div>
}

export default SettingsPage
