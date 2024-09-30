'use server'
import { signOut } from "@/services/userService";
import { redirect } from "next/navigation";

export async function signout() {

    const { error } = await signOut();

    if (error) {
        redirect('/error');
    }
  
    redirect('/');
}