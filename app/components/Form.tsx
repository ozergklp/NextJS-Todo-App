'use client'

type Todo = {
    id: number;
    title: string;
}

type Todos = {
    todos: Todo[]
}


import React, { useRef, 
                experimental_useOptimistic as useOptimistic } from 'react'

import addTodo from '../actions/action';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function Form({todos} : Todos) {
    const ref = useRef<HTMLFormElement>(null)
    const [optimisticTodos, addOptimisticTodo] = 
        useOptimistic(
            todos, 
            (state, newTodo: Todo) => {
        return [...state, newTodo];
    })

    const { pending } = useFormStatus()

    return (
    <>
        <form ref={ref} autoComplete='off' action={async formData => {
            ref.current?.reset();

            addOptimisticTodo({
                id: Math.random(),
                title: formData.get("todo") as string
            })
            await addTodo(formData)
        
        }} onSubmit={(e) => {
            console.log(e);
        }}>
        <input  type="text" 
                placeholder='Enter a Todo'
                className='m-4 p-1  px-2 pl-3 rounded-3xl shadow-lg focus:outline-none'
                name='todo'/>
        <button className='bg-blue-500 p-1 px-2 text-white shadow-lg rounded-2xl'
                disabled={pending}
                type='submit'  >Add</button>
        </form>
        <ul className=' list-disc'>
            {
                optimisticTodos.map(item => (
                <li key={item.id} 
                    className='m-2 ' > {item.title} </li>
                ))
            }
        </ul> 
    </>
    )
}
