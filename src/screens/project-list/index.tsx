import { SearchPanel } from "./search-panel"
import { List } from "./list"
import React, { useState } from 'react';
import { useDebounce } from '../../utils'
import styled from '@emotion/styled'
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/use";



export const ProjectListScreen = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debouncedParam = useDebounce(param, 500)
    const {  isLoading, error,data:list } = useProjects(debouncedParam)
    const {data:users} = useUsers()

    

    return <Container>
        <h1>项目列表</h1>
        <SearchPanel users={users || []} param={param} setParam={setParam} />
        <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
}

const Container = styled.div`
    padding:3.2rem;
`