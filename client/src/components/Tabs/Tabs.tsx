import { type FC } from 'react'

import Tab from './Tab'

import { type TabProps } from './Tab/Tab'

import styles from './TabsStyles.module.scss'

interface TabsProps {
  tabs: TabProps[]
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  return (
      <>
        <div className={styles.tabs_container}>
          {
            tabs.map((tab) => <Tab key={tab.id} {...tab} />)
          }
        </div>
        <div className={styles.divider} />
      </>
  )
}

export default Tabs
