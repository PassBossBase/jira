import qs from "qs";
import * as auth from "../auth_provider";
import { useAuth } from "../context/auth-context";


const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string,
    data?: object,
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : ``,
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === "GET") {
        endpoint += `?${qs.stringify(data)}`
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config)
        .then(async response => {
            if (response.status! === 401) {
                await auth.logout()
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await response.json()
            // 数据请求成功
            if (response.ok) {
                return data
                // 失败
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttp = () => {
    const { user } = useAuth()
    // Parameters
    return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}

//联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7

let JackFavoriteNumber: string | number;

//JS中的typeof 是在runtime时运行的
// return typeof 1 ==='number'
// TS 中的typeof 是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>


// 类型别名在很多情况下可以和interface互换
// interface Person{
//     name:string
// }
// type Person = {name:string}
// const xiaoMing:Person = {name:"xiaoming"}

//类型别名，interface在这种情况下没办法替代type
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = '6'

// interface 没办法实现Utility type

type Person ={
    name:string,
    age:number
}
const xiaoMing:Partial<Person> ={}
const shenmiren:Omit<Person,'name'> = {age:123}
type PersonKeys = keyof Person
type PersonOnlyName = Pick<Person,'name'>

// Partial实现

// type Partial<T>= {
//     [P in keyof T]?: T[P];
// }