import Form from './components/Form'
import { getServerSession } from "next-auth/next"
import { PrismaClient } from '@prisma/client'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Session } from 'next-auth'
const prisma = new PrismaClient()

type Todo = {
  id: number;
  content: string;
  userId:  string;
}

type Todos = {
  todos: Todo[]
}



export default async function Home(){
  
  const session: Session | null = await getServerSession(authOptions);
  
  const todos = await getUsers(session )

  return (
    <main className="m-10 flex flex-col items-center">
      {session && <Form  todos={todos} />}
    </main>
  )
  
}


async function getUsers(session: Session | null): Promise<Todo[]>{
  if(session){
    const prismaUser = await prisma.user.findUnique({
      where: {email: session?.user?.email || undefined}
    })
  
    
    const todos = await prisma.todo.findMany({
      where: {userId: prismaUser?.id}
    });
  
    return todos
  
  }
  let todos: Todo[] = [];
  return  todos
}
