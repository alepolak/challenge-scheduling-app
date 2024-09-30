'use server'

import { signOut } from "@/services/userService";

export async function signout() {
    await signOut();
}