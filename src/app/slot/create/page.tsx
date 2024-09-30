
import Topbar from "@/components/topbar/Topbar";
import styles from './style.module.css';

export default async function CreateSlotPage(){
    return (
        <>
            <Topbar title="Creating slot"/>
            <form>
                Create a slot here
            </form>
        </>
    );
};