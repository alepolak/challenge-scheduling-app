export type UserType = 'student' | 'coach';

export type User = {
    email: string;    
    firstName: string;
    id: string;
    lastName: string;
    phoneNumber: string;
    /* 
    *   If it is a student or a coach.
    */
    type: UserType;
};