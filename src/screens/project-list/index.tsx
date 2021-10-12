import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from '../../utils'
import qs from 'querystring'
import { useHttp } from "../../utils/http";


const apiUrl = process.env.REACT_APP_API_URL


export const ProjectListScreen = () => {

    const [param, setParam] = useState({
        name: '',
        personId: ''
    })

    const debouncedParam = useDebounce(param, 500)
    const [users, setUsers] = useState([])
    const [list, setList] = useState([])
    const client = useHttp()


    // 项目
    useEffect(() => {
        client('projects',{data:cleanObject(debouncedParam)}).then(setList)
        
    }, [debouncedParam])

    // 用户
    useMount(() => {
        client('users').then(setUsers)
        
    })

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </div>
}

