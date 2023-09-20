"use server"

import { PrismaClient, Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export default async function addTodo(formData: FormData){
        "use server"
        const content = formData.get("todo");
        console.log(content)

        const todo = await prisma.item.create({
        data: {
            title: content as string,
        }
        })

    revalidatePath('/')
}