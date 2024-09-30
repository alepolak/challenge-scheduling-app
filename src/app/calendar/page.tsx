import Bottombar from "@/components/bottombar/Bottombar";
import MainPage from "@/components/main-page/MainPage";
import Topbar from "@/components/topbar/Topbar";
import { getUser } from "@/services/userService";
import styles from './style.module.css';


export default async function CalendarPage() {

    const {data: user} = await getUser();
    

    return(
        <>
            <Topbar title="Calendar"/>
            <MainPage>
                <div className={styles.slots}>
                    
                </div>
            </MainPage>
            <Bottombar/>
        </>
    );
};