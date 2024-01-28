import { type FC } from 'react'

import Tab from './Tab'

import { type TabProps } from './Tab/Tab'

interface TabsProps {
  tabs: TabProps[]
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  return <div>
    {
      tabs.map((tab) => <Tab key={tab.id} {...tab} />)
    }
  </div>
}

export default Tabs
