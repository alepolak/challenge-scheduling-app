import { createClient } from "@/supabase/server";
import { CALL_TABLE } from "@/supabase/tableNames";
import { Call } from "@/types/Call";
import { ServiceResponse } from "@/types/ServiceResponse";
import { getUserById } from "./userService";

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