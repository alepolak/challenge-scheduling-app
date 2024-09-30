'use client'
import CallEditionForm from "@/components/call/form/CallEditionForm";
import Topbar from "@/components/topbar/Topbar";
import { getCall } from "@/services/callService";
import { Call } from "@/types/Call";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";

export default function CallEdititionPage(){

    const [call, setCall] = useState<Call | null>(null);
    const { id: callId } = useParams();

    // Get the slots
    useEffect(() => {

        async function getCallAsync() {
            // save here.
            const { data: callResponse} = await getCall(callId as string);

            if(callResponse) {
                setCall(callResponse);
            }
        }

        getCallAsync();
    }, [callId]);

    return(
        <>
            <Topbar title="Editing Call"/>
            { call && <CallEditionForm call={call}/> }
        </>
    );
};