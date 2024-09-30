import { Call } from "./Call";
import { User } from "./Users";

export const SLOT_TIME_FRAME = 2; /* This is the amount of time that a slot last. */

export type Calendar = {
    /* 
    *   Calendar with all the slots available. 
    */
    slots: CalendarSlot[];
};

export type CalendarSlot = {
    /* 
    *   The coach that open the slot.
    */
    coach: User;    
    /* 
    *   The call created to meet the student.
    */
    call: Call | null;
    /* 
    *   The date and time of the slot. 
    */
    date: Date;
    /* 
    *   The id of the slot. 
    */
    id: string;
};