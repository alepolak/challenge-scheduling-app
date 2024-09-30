import { AuthError, PostgrestError } from "@supabase/supabase-js";

export class ServiceResponse<T> {
    data: T | null;
    error: PostgrestError | AuthError | string | null;
    
    constructor() {
        this.data = null;
        this.error = null;
    }
}