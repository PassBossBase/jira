import { useEffect, useState } from "react"


// 判断值为0
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const isVoid = (value:unknown) => value ===undefined || value===null || value===""

// 在一个函数中，改变传入的对象本身是不好的
// 清空对象中值为空的键名
export const cleanObject = (object: {[key:string]:unknown}) => {
    // Object.assign({},object
    const result = { ...object }

    Object.keys(result).forEach((key:string) => {
        const value = result[key]
        if (isVoid(value)) {
            delete result[key]
        }
    })
    return result
}
// 页面初始时执行一次
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}
// 去抖
export const useDebounce = (value: any, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debounceValue
}

export function useArray<T>(initialArray: T[]) {
    const [value, setValue] = useState(initialArray)
    return {
        value,
        setValue,
        add: (item: T) => setValue([...value, item]),
        clear: () => setValue([]),
        removeIndex:(index:number)=>{
            const copy = [...value];
            copy.splice(index,1)
            setValue(copy)
        }
    }
}
