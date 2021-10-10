import  React from 'react';
import {useArray,useMount} from "../../utils"

interface ObjItem{
    name:string,
    age:number
}

export const TsReactTest = () =>{
    const persons:{name:string,age:number}[] = [
        {name:'jack',age:25},
        {name:'tom',age:19}
    ];
    const {value,clear,removeIndex,add}  = useArray(persons)
    
    useMount(()=>{

    })
    return(
        <div>
            <button onClick={()=>add({name:'jerry',age:20})}>增加jerry</button>
            <button onClick={()=>removeIndex(0)}>-删除当前第一个</button>
            <button onClick={()=>clear()}>清空</button>
            {
                value.map((item:ObjItem)=>{
                    return <p key={item.name}>{item.name}</p>
                })
            }
        </div>
    )
}