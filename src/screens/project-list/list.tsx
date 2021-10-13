import React from 'react';
import { User } from './search-panel';
import { Table } from 'antd';
import dayjs from 'dayjs'

interface Project {
    id: string;
    name: string;
    personId: string;
    pin: boolean;
    organization: string;
    created: number;
}

interface ListProps {
    list: Project[],
    users: User[]
}


export const List = ({ list, users }: ListProps) => {
    // console.log('users',users);
    // console.log('list',list);
    return <Table
        pagination={false}
        columns={[
            // a.name.localeCompare(b.name)可以排序中文字符
            { title: '名称', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
            { title: '部门', dataIndex: 'organization'},
            {
                title: '负责人', render(value, project) {
                    return <span>
                        {users.find(users => users.id === project.personId)?.name || '未知'}
                    </span>
                }
            },
            {
                title:'创建时间',
                render(value,project){
                    return <span>
                        {project.created? dayjs(project.created).format('YYYY-MM-DD HH:mm:ss'):'无'}
                    </span>
                }
            }
        ]}
        dataSource={list}

    />
}