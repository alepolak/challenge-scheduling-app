'use client'

import { createSlot } from "@/services/slotService";
import { isDateInThePast, isTimeInThePast } from "@/utils/dateAndTime";
import { redirect } from "next/navigation";

export async function saveSlot(formData: FormData): Promise<void> {

    const data = {
        date: formData.get('date') as string,
        time: formData.get('time') as string,
    };

    // Check data
    if(isDateInThePast(data.date) || isTimeInThePast(data.time))
        redirect('/error');
    
    const error = await createSlot(data.date, data.time);

    if (error) {
        redirect('/error');
    }

    const redirectingTo = '/calendar';
    redirect(redirectingTo);
}

export function cancel(): void {
    const redirectingTo = '/calendar';
    redirect(redirectingTo);
}