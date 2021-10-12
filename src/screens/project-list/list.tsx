import React from 'react' 
import {User} from './search-panel'
import {Table} from 'antd'

interface Project {
    id:string;
    name:string;
    personId:string;
    pin:boolean;
    organization:string;
}

interface ListProps{
    list:Project[],
    users:User[]
}


export const List = ({ list, users }:ListProps) => {
    // console.log('users',users);
    console.log('list',list);
    return <Table
        pagination={false}
        columns={ [
            // a.name.localeCompare(b.name)可以排序中文字符
            {title:'名称',dataIndex:'name',sorter:(a,b)=>a.name.localeCompare(b.name)},
            {title:'负责人',render(value,project){
                return <span>
                    {users.find(users => users.id == project.personId)?.name || '未知'}
                </span>
            }}
        ]}
        dataSource={list}
        
    />
}