import React, { ReactNode, useState } from 'react';
import { User } from '../screens/project-list/search-panel';
import * as auth from '../auth_provider'
import { http } from '../utils/http';
import { useMount } from '../utils';

// 创建全局容器context的方法返回一个全局对象
const AuthContext = React.createContext<{
    user: User | null,
    register: (form: AuthForm) => Promise<void>,
    login: (form: AuthForm) => Promise<void>,
    logout: () => Promise<void>,
} | undefined>(undefined);
AuthContext.displayName = "AuthContext";

//定义一个接口
interface AuthForm {
    username: string,
    password: string
}
// 初始化user,通过token获取user
const bootstrapUser = async() =>{
    let user =  null;
    const token = auth.getToken();
    if(token){
         const data = await http('me',{token})
         user = data.user
    }
    return user
}


// 提供用户操作的容器
export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null)
    //point free                       // user=>setUser(user)  等同 setUser
    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(()=>{
        bootstrapUser().then(setUser)
    })

    return <AuthContext.Provider children={children} value={{ user, login, register, logout }}/>

}

// 自定义hook

export const useAuth =() =>{
    const context = React.useContext(AuthContext)

    if(!context){
        throw new Error('useAuth 必须在AuthProvider 中使用')
    }
    return context

}