import { createClient } from "@/supabase/server";
import { CALL_TABLE } from "@/supabase/tableNames";
import { Call } from "@/types/Call";
import { ServiceResponse } from "@/types/ServiceResponse";
import { getUserById } from "./userService";

export async function getCallForSlot(id: string): Promise<ServiceResponse<Call>> {

    const response: ServiceResponse<Call> = new ServiceResponse();
    const supabase = await createClient();

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
        const {data: studentUser, error: errorGettingStudent} = await getUserById(callDBdata.student_id);
        if(errorGettingStudent) {
            console.log(`ERROR getting call student for slot ${id} --> `, errorGettingStudent);
            response.error = errorGettingStudent;
            return response;
        }
        
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