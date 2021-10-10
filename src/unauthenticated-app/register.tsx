import React, { FormEvent } from 'react';
import { useAuth } from '../context/auth-context';


export const RegisterScreen = () => {

    const { register, user } = useAuth()


    // HTMLFormElement extends Element
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()  //阻止默认提交
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        // 获取表单中id所指的数组集合event.currentTarget.elements
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        register({ username, password })

    }


    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="username">账户</label>
            <input type="text" id={'username'} />
        </div>
        <div>
            <label htmlFor="password">密码</label>
            <input type="password" id={'password'} />
        </div>
        <button type="submit">注册</button>
    </form>
}