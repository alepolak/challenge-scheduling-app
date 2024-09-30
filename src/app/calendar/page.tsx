import Bottombar from "@/components/bottombar/Bottombar";
import MainPage from "@/components/main-page/MainPage";
import Topbar from "@/components/topbar/Topbar";
import { getUser } from "@/services/userService";
import styles from './style.module.css';
import { getAllSlots, getSlotsByCreator } from "@/services/slotService";
import Slot from "@/components/slot/Slot";


export default async function CalendarPage() {

    const {data: user} = await getUser();
    const { data: slots } = user?.type === 'coach' ? await getSlotsByCreator(user?.id) : await getAllSlots();

    return(
        <>
            <Topbar title="Calendar"/>
            <MainPage>
                <div className={styles.slots}>
                    {
                        slots && user && slots.map((slot, i) => <Slot slot={slot} user={user} key={`${user.id}-${i}`}/>)
                    }
                </div>
            </MainPage>
            <Bottombar/>
        </>
    );
};