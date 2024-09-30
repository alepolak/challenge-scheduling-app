import Topbar from "@/components/topbar/Topbar";
import MainPage from "@/components/main-page/MainPage";
import Bottombar from "@/components/bottombar/Bottombar";
import styles from "./style.module.css";
import { getUser } from "@/services/userService";
import { getCallSlotsForUser } from "@/services/callService";
import Slot from "@/components/slot/Slot";

export default async function Home() {

  const { data: user } = await getUser();
  const slots = user ? await getCallSlotsForUser(user) : undefined;
  
  return (
    <>
      <Topbar title="Home Page"/>
      <MainPage>
      <div>
          <div className={styles.slots}>
            {
              user && slots && slots.data && slots.data.map((slot, i) => <Slot slot={slot} user={user} key={`${user.id}-${i}`}/>)
            }
           </div>
        </div>
      </MainPage>
      <Bottombar/>
    </>
  );
}