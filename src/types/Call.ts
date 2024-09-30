import { User } from "./Users";

export type Call = {
    /* 
    *   The student that asked for the call.
    */
    student: User;
    /* 
    *   The coach that is going to be available on this call.
    */
    coach: User;
    /* 
    *   The id of the call.
    */
    id: string;
    /* 
    *   If the call was completed or not.
    */
    isCompleted: boolean;
    /* 
    *   The value that the coach gives to the student depending on their satisfactions
    *   goes from 1 to 5.
    */
    studentSatisfaction: number | undefined;
    /*
    *   Any type of note that the coach took during the call about the student.
    */
    note: string | undefined;
}