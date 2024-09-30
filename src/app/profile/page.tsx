'use server'

import Bottombar from "@/components/bottombar/Bottombar";
import MainPage from "@/components/main-page/MainPage";
import Topbar from "@/components/topbar/Topbar";
import { getUser } from "@/services/userService";
import { signout } from "./action";
import styles from './style.module.css';


export default async function ProfilePage() {
    
    const { data: user } = await getUser();

    return (
        <>
            <Topbar title="Profile"/>
            <MainPage>
                {
                    user && 
                    <div className={styles.user}>
                        <p className={styles.name}> {user.type[0].toUpperCase() + user.type.slice(1)} {user.firstName} {user.lastName}</p>
                        <div className={styles.contact}>
                            <p> email: {user?.email}</p>
                            <p> phone: {user?.phoneNumber}</p>
                        </div>
                    </div>
                }
                
                <form className={styles.form}>
                    <button formAction={signout}> Sign Out </button>
                </form>
            </MainPage>
            <Bottombar/>
        </>
    );
};