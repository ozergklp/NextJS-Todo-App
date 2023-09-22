"use client";
import { PrismaClient } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
        const { data: session } = useSession();
    
        if (session) {
        return (
            <>
            <button onClick={() => signOut()}
                    className="flex-1 text-left ml-4">Sign out</button>
            <p className="mr-4"> {session?.user?.name} </p> 
            <img src= {session?.user?.image || undefined} className="w-16 mr-4  rounded-full" />
            </>
        );
        }
        return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    );
}

export default function NavMenu(){
    return(
        <nav className="flex items-center justify-between m-5">
            <AuthButton />
        </nav>
    )
}