// import { jsx } from '@emotion/react'
import React from 'react';
import { Input, Select, Form } from '_antd@4.16.13@antd';

export interface User {
    id: string,
    name: string,
    email: string,
    organization: string,
    token: string
}

interface SearchPanelProps {
    users: User[],
    param: {
        name: string,
        personId: string
    },
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {

    return <Form style={{ marginBottom: '2rem' }} layout={'inline'}>
        <Form.Item>
            {/* setParam(Object.assign({},param,{name:ev.target.value})) */}
            <Input
                placeholder={'项目名'}
                type="text"
                value={param.name}
                onChange={ev => setParam({
                    ...param,
                    name: ev.target.value

                })} />
        </Form.Item>
        <Form.Item>
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value="">负责人</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option >)
                }
            </Select>
        </Form.Item>
    </Form>
}