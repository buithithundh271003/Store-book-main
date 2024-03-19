import React, { useState } from 'react';
import { Link } from 'react-router-dom';
type Props = { children: React.ReactNode };

import {
    PieChartOutlined,
    CodeSandboxOutlined,
    AppstoreAddOutlined,
    LogoutOutlined,
    TagOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link to={"/admin/dashboard"}>Dashboard</Link >, '1', <PieChartOutlined />),
    getItem('Products', 'sub1', <CodeSandboxOutlined />, [
        getItem(<Link to={"/admin/product/add"}>Create New</Link >, '3'),
        getItem(<Link to={"/admin/product"}>View List</Link >, '4'),
    ]),
    getItem('Categorys', 'sub2', <AppstoreAddOutlined />, [
        getItem(<Link to={"/admin/category/add"}>Create New</Link >, '5'),
        getItem(<Link to={"/admin/category"}>View List</Link >, '6'),
    ]),
    getItem(<Link to={"/admin/order"}>Order</Link >, '7', <TagOutlined />),
    getItem('Logout', '9', <LogoutOutlined />),
];

const AdminLayout = ({ children }: Props) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                {/* <Space className='flex justify-center'>
                    <img src="../../public/image/logo.png" alt=""
                        className=' w-24 '
                    />
                </Space> */}
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout style={{ marginLeft: 200 }}>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content className=''>

                    <div className='bg-slate-50' style={{ padding: 24, minHeight: 360 }}>
                        {children}
                    </div>
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer> */}
            </Layout>
        </Layout>
    );
};

export default AdminLayout;