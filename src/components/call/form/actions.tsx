'use client'
import { saveCallNote } from "@/services/callService";
import { redirect } from "next/navigation";

export async function saveCall(id:string, callCompleted: boolean, satisfaction: number, notes: string): Promise<void> {

    // Call service
    const { error } = await saveCallNote(id, callCompleted, satisfaction, notes);

    if (error) {
        redirect('/error');
    } else {
        const redirectingTo = '/calendar';
        redirect(redirectingTo);
    }
}

export function cancel(): void {
    const redirectingTo = '/calendar';
    redirect(redirectingTo);
}