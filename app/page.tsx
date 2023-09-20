import { PrismaClient } from '@prisma/client'


import Form from "./components/Form"
const prisma = new PrismaClient()


export default async function Home() {

  const todos = await prisma.item.findMany();

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-200 p-24">
      <h1 className='text-3xl font-bold  m-5'>Todo</h1>
      <Form  todos={todos}/>
    </main>
  )
}
