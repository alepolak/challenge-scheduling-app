
import SlotCreationForm from "@/components/slot/form/SlotCreationForm";
import Topbar from "@/components/topbar/Topbar";

export default async function CreateSlotPage(){
    return (
        <>
            <Topbar title="Creating slot"/>
            <SlotCreationForm />
        </>
    );
};