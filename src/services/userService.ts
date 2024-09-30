import { createClient } from "@/supabase/server";
import { ServiceResponse } from "@/types/ServiceResponse";
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