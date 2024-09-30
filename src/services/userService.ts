'use server'
import { createClient } from "@/supabase/server";
import { COACH_TABLE, USER_DATA_TABLE } from "@/supabase/tableNames";
import { ServiceResponse } from "@/types/ServiceResponse";
import { User } from "@/types/Users";
import { SignInWithPasswordCredentials } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * 
 * Sign in using supabase client.
 * 
 * @param signInData email and password
 */
export async function signIn(signInData: SignInWithPasswordCredentials) {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword(signInData);

    if (error) {
        console.log(`ERROR - Sign in --> error: `, error);    
        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    const redirectingTo = '/';
    revalidatePath(redirectingTo, 'layout');
    redirect(redirectingTo);
};

/**
 * 
 *  Sign out using supbase client.
 * 
 */
export async function signOut() {

    const supabase = createClient();
    
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log(`ERROR - Signout --> error: `, error);    
        redirect(`/profile?error=${encodeURIComponent(error.message)}`);
    }

    const redirectingTo = '/';
    revalidatePath(redirectingTo, 'layout');
    redirect(redirectingTo);
};


/**
 * 
 * Gets the logged user data.
 * 
 * @returns the logged user data.
 */
export async function getUser(): Promise<ServiceResponse<User>> {
    const supabase = createClient();   
    const {data: { user }, error} = await supabase.auth.getUser();
    
    if( user ) {
        return getUserById(user.id);
    }

    return {data: null, error: error};
};

/**
 * 
 * Get the user data by the user id.
 * Why do we need this? In supabase there is an auth api that solves all the auth process in a very
 * simple way. That api uses the table public.auth that doesn't store a lot (we are using the id). I created
 * a new user_data table with more information: name, phone, mail, etc.
 * 
 * @param id of the user data that we want to fetch
 * @returns the user.
 */
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