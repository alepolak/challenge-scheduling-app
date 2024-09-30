import { signIn } from "@/services/userService";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    'use server'
    const signInData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };
    
    const { error } = await signIn(signInData);

    if (error) {
        redirect('/error');
    }

    const redirectingTo = '/';
    revalidatePath(redirectingTo, 'layout');
    redirect(redirectingTo);
}