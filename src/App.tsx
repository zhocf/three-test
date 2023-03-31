import { Button, Menu, MenuProps } from 'antd'
import { SettingOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import RouterView from "./router"
import { Link, useLocation } from 'react-router-dom';

function App() {
    const location = useLocation()
    const [selectedKeys, setSelectKeys] = useState<string>('')

    const Items: MenuProps['items'] = [
        {
            label: '案例',
            key: '/examples',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to="/examples/overali">3d看房</Link>,
                    key: '/examples/overali'
                }
            ],
        },
        {
            label: '练习',
            key: '/test',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to="/test/modeling">模型</Link>,
                    key: '/test/modeling'
                }
            ],
        },
    ];
    useEffect(() => {
        setSelectKeys(location.pathname)
    }, [location.pathname])

    return (
        <div className="App">
            <div className='menu-control'>
                <Menu
                    mode="inline"
                    items={Items}
                    selectedKeys={[selectedKeys]}
                    defaultOpenKeys={['/examples','/test']} />
            </div>
            <div className='canvas-control'>
                <RouterView />
            </div>

        </div>
    )
}

export default App
