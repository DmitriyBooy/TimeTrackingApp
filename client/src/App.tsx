import { type FC } from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import SettingsButton from './components/SettingsButton'

import { Layout, Button, Space } from 'antd'

const { Header, Content } = Layout

const App: FC = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onBack = (): void => {
    navigate(-1)
  }

  return (
      <Layout style={{ height: '100vh' }} >
        <Header>
          <Space>
            {
                pathname !== '/' && (
                    <Button onClick={onBack}>
                      Назад
                    </Button>
                )
            }

            <SettingsButton />
          </Space>
        </Header>

        <Content>
          <Outlet/>
        </Content>
      </Layout>
  )
}

export default App
