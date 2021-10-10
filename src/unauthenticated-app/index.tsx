import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"

export const UnauthenticatedApp = () =>{

    // 定义一个状态用于在login和register中进行切换
    const [isRegister,setIsRegister]= useState(false)

    // 条件判断默认情况显示登陆界面
    return <div>
        {
            isRegister ? <RegisterScreen/> : <LoginScreen/>
        }
        <button onClick={()=>setIsRegister(!isRegister)}>切换到{isRegister?'登录':'注册'}</button>
    </div>

}