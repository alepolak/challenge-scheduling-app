import { createClient } from "@/supabase/server";
import { SLOT_TABLE } from "@/supabase/tableNames";
import { CalendarSlot } from "@/types/Calendar";
import { ServiceResponse } from "@/types/ServiceResponse";
import { getUserById } from "./userService";
import { getDateTimeFromSupabase } from "@/utils/dateAndTime";
import { getCallForSlot } from "./callService";

/**
 * 
 * Gets all the slots.
 * 
 * @returns an array of slots
 */
export async function getAllSlots(): Promise<ServiceResponse<CalendarSlot[]>> {

    const supabase = createClient();

    // Get all the slots from the db.
    const {data, error} = await supabase
        .from(SLOT_TABLE)
        .select("id, created_by, date_time");

    if (error) {    
        console.log(`ERROR while getting slots --> `, error);
        return { error: error, data: []};
    }

    // Complete the slots with the users and the call.
    const slotsData = await Promise.all(
        data.map(async slot => {
            const { data: coachUser, error: coachUserError } = await getUserById(slot.created_by);
            const { data: call, error: callError } = await getCallForSlot(slot.id);

            if(coachUserError) {
                console.log(`ERROR --> getting slots data --> coach user error`, coachUserError);
            }

            if(callError) {
                console.log(`ERROR --> getting slots data --> call for slot error`, callError);
            }

            return {
                call: call,
                coach: coachUser,
                date: getDateTimeFromSupabase(slot.date_time),
                id: slot.id
            } as CalendarSlot;
        })
    );
    
    return { error: error, data: slotsData };
}

/**
 * 
 * Gets all the slots of a specific coach.
 * 
 * @param id id of a coach.
 * 
 * @returns an array of slots from a specific foach.
 */
export async function getSlotsByCreator(id: string): Promise<ServiceResponse<CalendarSlot[]>> {
    const supabase = createClient();
    let slotsData:CalendarSlot[] = [];

    // Gets the slots from a specific coach from the db.
    const {data, error} = await supabase
        .from(SLOT_TABLE)
        .select("id, created_by, date_time")
        .eq("created_by", id);

    if (error) {    
        console.log(`ERROR while getting slots with ID --> `, error);
        return { error: error, data: []};
    }

    // Get the user data for that coach.
    const {data: userData, error: userDataError} = await getUserById(data[0].created_by);

    if(userDataError) {
        console.log(`ERROR while getting slots with ID --> `, error);
        return { error: userDataError, data: []};
    }
    
    // Complete the slots with the call.
    slotsData = await Promise.all(
        data.map(async (slot): Promise<CalendarSlot> => {
            const {data: call } = await getCallForSlot(slot.id);

            return {
                call: call,
                coach: userData,
                date: getDateTimeFromSupabase(slot.date_time),
                id: slot.id
            } as CalendarSlot;
        })
    );

    return {error: null, data: slotsData};
}

/**
 * 
 * Delete one slot.
 * 
 * @param id of the slot to delete
 */
export async function deleteSlot(id: string) {
    const supabase = createClient();

    try {
        // Deletes the slot from the db.
        const { error } = await supabase
            .from(SLOT_TABLE)
            .delete()
            .eq('id', id);
        
        if (error) {    
            console.log(`ERROR while deleting a slot --> `,error);
            return error;
        }

    } catch (error) {    
        console.log(`CATCHED ERROR --> `,error);
    }
}