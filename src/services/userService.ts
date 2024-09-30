import { createClient } from "@/supabase/server";
import { COACH_TABLE, USER_DATA_TABLE } from "@/supabase/tableNames";
import { ServiceResponse } from "@/types/ServiceResponse";
import { User } from "@/types/Users";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";

export async function signIn(signInData: SignInWithPasswordCredentials): Promise<ServiceResponse<void>> {
    const response: ServiceResponse<void> = new ServiceResponse();
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(signInData);

    if (error) {
        console.log(`ERROR - Sign in --> error: `, error);    
        response.error = error;
        return response;
    }

    return response;
};

export async function signOut(): Promise<ServiceResponse<void>> {
    const response: ServiceResponse<void> = new ServiceResponse();
    const supabase = createClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(`ERROR - Signout --> error: `, error);    
        response.error = error;
        return response;
    }

    return response;
};

export async function getUser(): Promise<ServiceResponse<User>> {
    const supabase = createClient();   
    const {data: { user }, error} = await supabase.auth.getUser();
    
    if( user ) {
        return getUserById(user.id);
    }

    return {data: null, error: error};
};

export async function getUserById(id: string): Promise<ServiceResponse<User>> {
    const response: ServiceResponse<User> = new ServiceResponse();
    const supabase = createClient();   
    
    try {
        // Fetch the userData from the user_data table
        const { data: userData, error: userDataError } = await supabase
            .from(USER_DATA_TABLE)
            .select('name, phone_number, last_name, email')
            .eq('user_id', id)
            .single();

        if (userDataError) {
            console.log(`GET USER BY ID ${id} --> ERROR --> userDataError:`, userDataError);
            response.error = userDataError;
            return response;
        }

        // Fetch the coach table to see if the user is a coach (if the id is there, is the coach)
        const { data: userDataType, error: userDataTypeError } = await supabase
            .from(COACH_TABLE)
            .select('*')
            .eq('user_id', id);

        if (userDataTypeError) {
            console.log(`GET USER BY ID ${id} --> ERROR --> userDataTypeError:`, userDataTypeError);
            response.error = userDataTypeError;
            return response;
        }

        // Generate the user
        const loggedUser: User = {
            email: userData.email || " ",
            firstName: userData.name,
            id: id,
            lastName: userData.last_name,
            phoneNumber: userData.phone_number,
            type: userDataType[0] ? 'coach' : 'student',
        }

        response.data = loggedUser;

        return response;
    } catch (error) {
        console.error(error);
        return response;
    }
};