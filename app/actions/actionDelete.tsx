"use server"
import { PrismaClient, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache';


const prisma = new PrismaClient()

export default async function deleteTodo(id: number){
        "use server"

        const deleteTodo = await prisma.todo.delete({
            where: {
                id: id,
            },
        })



    revalidatePath('/')
}