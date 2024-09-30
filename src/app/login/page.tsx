import Topbar from '@/components/topbar/Topbar';
import styles from './style.module.css';
import MainPage from '@/components/main-page/MainPage';
import Bottombar from '@/components/bottombar/Bottombar';
import { login } from './actions';

export default async function LoginPage() {
    return (
        <>
            <Topbar title='Login'/>
            <MainPage>
                <form className={styles.form}>
                    <div className={styles.inputs}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" type="email" required />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="password">Password:</label>
                            <input id="password" name="password" type="password" required />
                        </div>
                    </div>
                    <button formAction={login}> Login </button>
                </form>
            </MainPage>
            <Bottombar/>
        </>
    );
};