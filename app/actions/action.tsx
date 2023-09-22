"use server"
import { PrismaClient, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next';
import { revalidatePath } from 'next/cache';
import { authOptions } from '../api/auth/[...nextauth]/route';


const prisma = new PrismaClient()

export default async function addTodo(formData: FormData){
        "use server"
        const title = formData.get("todo");
        //console.log(title)


        const session = await getServerSession(authOptions);
        //console.log("dudeee", session)

    
        const prismaUser = await prisma.user.findUnique({
            where: {email: session?.user?.email || undefined}})

        const post = await prisma.todo.create({
            data:{
                content: title as string,
                userId: prismaUser?.id as string 
            }
        })
        
        //console.log("prisma user is:" , prismaUser);
        



    revalidatePath('/')
}