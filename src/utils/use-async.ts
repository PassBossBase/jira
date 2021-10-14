import { useState } from 'react';

interface State<D> {
    // 错误信息
    error: Error | null;
    // 数据
    data: D | null;
    // loading状态
    stat: 'Idle' | 'loading' | 'error' | 'success';
}
const defaultInitialState: State<null> = {
    stat: 'Idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {

    const config = { ...defaultConfig, initialConfig }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })
    // 设置成功状态
    const setData = (data: D) => setState({
        data,
        stat: 'success',
        error: null
    })
    // 设置失败状态
    const setError = (error: Error) => setState({
        data: null,
        stat: 'error',
        error
    })
    // run 用来触发异步请求
    const run = (promise: Promise<D>) => {
        // 如果不是promise类型或不是promise
        if (!promise || !promise.then) {
            throw new Error('请输入promise 类型数据')
        }
        // 一开始使用loading显示
        setState({ ...state, stat: 'loading' })
        // 数据返回之后显示数据
        return promise.then((data: D) => {
            setData(data)
            return data
        }).catch(error => {
            setError(error);
            if (config.throwOnError) return Promise.reject(error);
            return error;
        })
    }

    return {
        isIdle: state.stat === 'Idle',
        isLoading: state.stat === "loading",
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        ...state

    }

}

