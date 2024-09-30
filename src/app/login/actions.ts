import { signIn } from "@/services/userService";

export async function login(formData: FormData) {
    'use server'
    const signInData = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    };
    
    await signIn(signInData);
}