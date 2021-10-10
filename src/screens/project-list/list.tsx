import React from 'react' 
import {User} from './search-panel'

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

    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>
                        {project.name}
                    </td>
                    <td>
                        {/* ？的作用：当？前的表达式为undefined的时候，整个表达式为undefined */}
                        {users.find(users => users.id === project.personId)?.name || '未知'}
                    </td>
                </tr>)
            }
        </tbody>
    </table>
}