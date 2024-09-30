'use server'
import { createClient } from "@/supabase/server";
import { SLOT_TABLE } from "@/supabase/tableNames";
import { CalendarSlot } from "@/types/Calendar";
import { ServiceResponse } from "@/types/ServiceResponse";
import { getUserById } from "./userService";
import { getDateTimeFromSupabase, getSupabaseDateTime } from "@/utils/dateAndTime";
import { getCallForSlot } from "./callService";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

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

    // If there is any slots by that coach.
    if(data.length > 0) {
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
    }

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

    revalidatePath('calendar', 'page');
    revalidatePath('app', 'page');
}

/**
 * 
 * Creates a new slot in the database.
 * 
 * @param date of the slot.
 * @param time of the slot.
 * @returns 
 */
export async function createSlot(date: string, time: string): Promise<PostgrestError | null | undefined> {
    const supabase = createClient();
    const {data: { user }} = await supabase.auth.getUser();

    // Prepare the object to add.
    const slotObject = {
        created_by: user?.id,
        date_time: getSupabaseDateTime(date, time),
    };

    try {
        // Add the slot into the db.
        const { error } = await supabase
            .from(SLOT_TABLE)
            .insert([slotObject])
            .select();
            
        if (error) {    
            console.log(`ERROR while creating a slot --> `,error);
            return error;
        }

        revalidatePath('calendar', 'page');
    } catch (error) {    
        console.log(`CATCHED ERROR --> `,error);
    }

    return null;
};

/**
 * 
 * Gets all the slots by the ids.
 * 
 * @param ids of slots.
 * @returns an array of slots based on the ids.
 */
export async function getSlotsByArrayIds(ids: string[]): Promise<ServiceResponse<CalendarSlot[]>> {
    
    const response: ServiceResponse<CalendarSlot[]> = new ServiceResponse();

    const slots: CalendarSlot[] = await Promise.all(
        ids.map(async (id): Promise<CalendarSlot> => {
            //Gets the slot data.
            const {data: slot } = await getSlotById(id);

            if(slot) {
                // Gets the user data
                const {data: userData } = await getUserById(slot.created_by);

                // Gets the call data.
                const {data: call } = await getCallForSlot(slot.id);
                
                return {
                    call: call,
                    coach: userData,
                    date: getDateTimeFromSupabase(slot.date_time),
                    id: slot.id
                } as CalendarSlot;
            }
            return {} as CalendarSlot;
        })
    );

    response.data = slots;

    return response;
}


interface SlotData {
    id: string,
    created_at: string;
    created_by: string;
    date_time: string;
}

/**
 * 
 * Get the slot db data with an id.
 * 
 * @param id of a slot.
 * @returns slot db data.
 */
async function getSlotById(id: string): Promise<ServiceResponse<SlotData>> {

    const response: ServiceResponse<SlotData> = new ServiceResponse();
    const supabase = createClient();

    // Gets the slot of the db based on the id.
    const { data, error } = await supabase
        .from(SLOT_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if(error) {
        console.log(`ERROR getting slot by id: ${id}`, error);
        response.error = error;
        return response;
    }

    response.data = data;

    return response;
}