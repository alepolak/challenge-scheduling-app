'use server'
import { createClient } from "@/supabase/server";
import { CALL_TABLE } from "@/supabase/tableNames";
import { Call } from "@/types/Call";
import { ServiceResponse } from "@/types/ServiceResponse";
import { getUserById } from "./userService";
import { User } from "@/types/Users";
import { CalendarSlot } from "@/types/Calendar";
import { getSlotsByArrayIds } from "./slotService";

/**
 * 
 * Gets the call of a specific slot.
 * 
 * @param id of the slot that we want to get it's call
 * @returns a call related to the slot.
 */
export async function getCallForSlot(id: string): Promise<ServiceResponse<Call>> {

    const response: ServiceResponse<Call> = new ServiceResponse();
    const supabase = await createClient();

    // Gets the call of a specific slot from the db.
    const { data: callData, error: errorGettingCall} = await supabase
        .from(CALL_TABLE)
        .select('*')
        .eq('slot_id', id);

    const callDBdata = callData?.length === 1 ? callData[0] : null;
        
    if(errorGettingCall) {
        console.log(`ERROR getting call for slot ${id} --> `, errorGettingCall);
        response.error = errorGettingCall;
        return response;
    }

    if(callDBdata) {
        // Gets the user data of the student.
        const {data: studentUser, error: errorGettingStudent} = await getUserById(callDBdata.student_id);
        if(errorGettingStudent) {
            console.log(`ERROR getting call student for slot ${id} --> `, errorGettingStudent);
            response.error = errorGettingStudent;
            return response;
        }
        
        // Gets the user data of the coach.
        const {data: coachUser, error: errorGettingCoach} = await getUserById(callDBdata.coach_id);
        if(errorGettingCoach) {
            console.log(`ERROR getting call coach for slot ${id} --> `, errorGettingCoach);
            response.error = errorGettingCoach;
            return response;
        }
        
        if(studentUser && coachUser) {
            const call: Call = {
                coach: coachUser,
                id: callDBdata.id,
                isCompleted: callDBdata.is_completed,
                note: callDBdata.note,
                student: studentUser,
                studentSatisfaction: callDBdata.user_satisfaction,
            };
            
            response.data = call;
            return response;
        }
    }

    response.error = "Unexpected error - getting users for the call for slot ${id}";
    return response;
}

/**
 * 
 * Marks a call as completed.
 * 
 * @param id of the call to mark as completed.
 */
export async function completeCall(id: string): Promise<ServiceResponse<undefined>> {
    const response: ServiceResponse<undefined> = new ServiceResponse();

    const supabase = createClient();

    const { error } = await supabase
        .from(CALL_TABLE)
        .update({ is_completed: true })
        .eq('id', id);

    if(error) {
        console.log(`ERROR completing a call with id: ${id}`, error);
        response.error = error;
    }

    // This right here is needed, because we are using it in a useEffect that is not a server function.
    return JSON.parse(JSON.stringify(response));
};

/**
 * 
 * Creates a new call between a student and a coach for a specific slot.
 * 
 * @param slotId slot where the call is going to be created.
 * @param student that created the call.
 * @param coach that created the slot and is involved in the call.
 * @returns 
 */
export async function createCall(slotId: string, student: User, coach: User): Promise<ServiceResponse<null>> {
    const response: ServiceResponse<null> = new ServiceResponse();
    const supabase = await createClient();

    // Prepare data to be inserted
    const newCall = {
        slot_id: slotId,
        student_id: student.id,
        coach_id: coach.id,        
    };

    // Insert the data on the db.
    const {data, error} = await supabase
        .from(CALL_TABLE)
        .insert([newCall])
        .select()
        .single()

    if(error) {
        console.error(`ERROR creating a new call-->`, error);
        response.error = error;
        return response;
    }

    response.data = data;

    return response;
}

/**
 * 
 * Get the slots of a user that have a call assigned to it.
 * 
 * @param user is going to be use to search for his calls.
 * @returns array of slots with calls.
 */
export async function getCallSlotsForUser(user: User): Promise<ServiceResponse<CalendarSlot[]>> {
    const response: ServiceResponse<CalendarSlot[]> = new ServiceResponse();

    const callsIdsResponse = await getCallIdsForUser(user);

    if(callsIdsResponse.error) {
        console.log(`ERROR - getCallSlotsForUser - can't get call ids for user ${user.id}`, callsIdsResponse.error);
    } else if(callsIdsResponse.data){
        const { data } = await getSlotsByArrayIds(callsIdsResponse.data);
        response.data = data;
    }

    return response;
}

/**
 * 
 * Get the call ids for a specific user.
 * 
 * @param user is going to be use to search for his calls.
 * @returns arrat of ids of calls.
 */
export async function getCallIdsForUser(user: User): Promise<ServiceResponse<string[]>> {

    const response: ServiceResponse<string[]> = new ServiceResponse();

    if(user) {     
        const supabase = await createClient();
        
        // sets which column is going to check against. 
        const fk = user.type === 'coach' ? 'coach_id' : 'student_id';

        // Gets the call data from the db.
        const {data, error} = await supabase
            .from(CALL_TABLE)
            .select('*')
            .eq(fk, user.id);

        if(error) {
            console.log(`ERROR getting call for id: ${user.id}`, error);
            response.error = error;
            return response;
        }

        response.data = data.map(callData => callData.slot_id);
        return response;
    }

    return response;
};


/**
 * 
 * Get the call data from it's id.
 * 
 * @param id of the call.
 * @returns the call data.
 */
export async function getCall(id: string): Promise<ServiceResponse<Call>> {
    const response: ServiceResponse<Call> = new ServiceResponse();

    const supbase = createClient();

    // Get the call data from the db.
    const { data, error } = await supbase
        .from(CALL_TABLE)
        .select('*')
        .eq("id", id)
        .single();

    if(error) {
        console.log(`ERROR getting a call with id: ${id}`, error);
        response.error = error;
    }

    // Get the student user data.
    const {data: studentUser, error: errorGettingStudent} = await getUserById(data.student_id);
    if(errorGettingStudent) {
        console.log(`ERROR getting call student for slot ${id} --> `, errorGettingStudent);
        response.error = errorGettingStudent;
        return response;
    }
    
    // Get the coach user data.
    const {data: coachUser, error: errorGettingCoach} = await getUserById(data.coach_id);
    if(errorGettingCoach) {
        console.log(`ERROR getting call coach for slot ${id} --> `, errorGettingCoach);
        response.error = errorGettingCoach;
        return response;
    }
    
    if(studentUser && coachUser) {
        const call = {
            coach: coachUser,
            id: data.id,
            isCompleted: data.is_completed,
            note: data.note,
            student: studentUser,
            studentSatisfaction: data.user_satisfaction,
        };

        response.data = call;
    }


    // This right here is needed, because we are using it in a useEffect that is not a server function.
    return JSON.parse(JSON.stringify(response));
};

/**
 * 
 * Saves the call note information.
 * 
 * @param callId id of the call.
 * @param isCallOver boolean if the call is over or not.
 * @param satisfaction user satisfaction. Range from 1-5.
 * @param note note that the coach took forom the call.
 * @returns 
 */
export async function saveCallNote(callId: string, isCallOver: boolean, satisfaction: number, note: string): Promise<ServiceResponse<null>> {
    const response: ServiceResponse<null> = new ServiceResponse();

    const supabase = await createClient();

    // Checks data
    satisfaction = Math.min(Math.max(satisfaction, 0), 5);

    // Saves the data into the db.
    const { error } = await supabase
        .from(CALL_TABLE)
        .update([{'is_completed': isCallOver, 'user_satisfaction': satisfaction, 'note': note}])
        .eq('id', callId)
        .select();

    if(error) {
        console.log(`ERROR saving the call data --> `, error);
        response.error = error;
        return response;
    }

    // This right here is needed, because we are using it in a useEffect that is not a server function.
    return JSON.parse(JSON.stringify(response));
}   