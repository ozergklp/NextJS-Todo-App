'use client'

import { AiOutlineDelete} from "react-icons/ai"
import { BiSend } from "react-icons/bi";
type Todo = {
    id: number;
    content: string;
    userId:  string;
}

type Todos = {
    todos: Todo[]
}


import React, { useRef, 
                experimental_useOptimistic as useOptimistic } from 'react'

import addTodo from '../actions/action';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import deleteTodo from "../actions/actionDelete";

export default function Form({todos} : Todos) {
    const ref = useRef<HTMLFormElement>(null)
    const [optimisticTodos, setOptimisticTodos] = useOptimistic(todos)

    const { pending } = useFormStatus()

    return (
    <>
        <form ref={ref} autoComplete='off' action={async formData => {
            ref.current?.reset();

            /*
            addOptimisticTodo({
                id: Math.random(),
                content: formData.get("todo") as string,
                userId: JSON.stringify(Math.random())
            })

            */

            setOptimisticTodos((prev => [...prev,{
                id: Math.random(),
                content: formData.get("todo") as string,
                userId: JSON.stringify(Math.random())
            }]))
    
            await addTodo(formData)
        
        }} onSubmit={(e) => {
            console.log(e);
        }}
        className='w-[30rem] flex rounded-3xl  border-2 border-slate-200 p-2'
        >
        <input  type="text" 
                placeholder='Enter a Todo'
                className='  pl-2  flex-1  focus:outline-none text-xl'
                name='todo'/>
        <button className='  hover:text-teal-800  hover:shadow-xl hover:bg-slate-200  p-1 text-[1.6rem]  rounded-xl'
                disabled={pending}
                type='submit'  > <BiSend /> </button>
        </form>
        <ul className='flex flex-col w-[29rem]'>
            {
                optimisticTodos && (
                    optimisticTodos.map(item => (
                        <li key={item.id} 
                            className=' flex justify-between mt-5 rounded-lg bg-slate-100 border-2 p-2 text-xl  items-center ' > 
                                <input type="checkbox" className='mr-2'/>
                                <p className='flex-1 '> {item.content} </p>
                                <button 
                                    onClick={async () => {
                                        /* 
                                        const newA: Todo[]   = optimisticTodos.filter(todo => {
                                            return todo.id !== item.id
                                        }) 
                                        console.log(newA);
                                        setOptimisticTodos(newA)
                                        */
                                        setOptimisticTodos((prev) => prev.filter(todo => todo.id !== item.id ))
                                        await deleteTodo(item.id);
                                    }}
                                    className="hover:shadow-xl hover:text-teal-800 text-2xl rounded-xl hover:bg-slate-200 p-1"><AiOutlineDelete /></button>
                            </li>
                        ))
                )

            }
        </ul> 
    </>
    )
}
