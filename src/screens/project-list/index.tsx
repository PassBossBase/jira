import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useEffect, useState } from 'react';
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from "../../utils/http";
import styled from '@emotion/styled'

// const apiUrl = process.env.REACT_APP_API_URL


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
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedParam])

    // 用户
    useMount(() => {
        client('users').then(setUsers)

    })

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users} param={param} setParam={setParam} />
        <List users={users} list={list} />
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`