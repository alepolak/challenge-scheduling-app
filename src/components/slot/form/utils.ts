import { CalendarSlot, SLOT_TIME_FRAME } from "@/types/Calendar";

const getDifferenceInHours = (date1: Date, date2: Date): number => {
    const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
    return diffInMilliseconds / (1000 * 60 * 60);
}

/**
 * 
 * Checks if the date and time overlaps with any of the slots that are already created. 
 * It uses the SLOT_TIME_FRAME which is set in 2 hours.
 * 
 * @param date of the slot.
 * @param time of the slot.
 * @param slots all the other slots created.
 * @returns true if the date and time doesn't overlap with existing slots.
 */
export const isSlotAvailable = (date: string, time: string, slots: CalendarSlot[]): boolean => {
    const requestedDateTime = new Date(`${date}T${time}`);
    return slots.some(slot => {
        const slotDateTime = new Date(slot.date);       
        const hourDifference = getDifferenceInHours(requestedDateTime, slotDateTime);
        return hourDifference < SLOT_TIME_FRAME;
    });
}