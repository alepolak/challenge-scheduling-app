'use server'

import Bottombar from "@/components/bottombar/Bottombar";
import MainPage from "@/components/main-page/MainPage";
import Topbar from "@/components/topbar/Topbar";
import { getUser } from "@/services/userService";
import { signout } from "./action";
import styles from './style.module.css';
import TextButton from "@/components/buttons/text-button/TextButton";
import NotificationBanner from "@/components/notifications/Notification";

interface ProfilePageProps {
    searchParams: { [key: string]: string | string[] | undefined };
}


export default async function ProfilePage({ searchParams }: ProfilePageProps) {
    const errorMessage = searchParams.error;
    const { data: user } = await getUser();

    return (
        <>
            <Topbar title="Profile"/>
            <MainPage>
                <div className={styles.bannerSpace}>
                    { errorMessage && <NotificationBanner type='error' message={errorMessage.toString()}/> }
                </div>
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
                    <TextButton formAction={signout} text="Sign Out"/>
                </form>
            </MainPage>
            <Bottombar/>
        </>
    );
};