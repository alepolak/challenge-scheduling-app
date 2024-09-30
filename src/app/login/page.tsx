import TextButton from '@/components/buttons/text-button/TextButton';
import { login } from './actions';
import styles from './style.module.css';
import NotificationBanner from '@/components/notifications/Notification';
import Topbar from '@/components/topbar/Topbar';
import MainPage from '@/components/main-page/MainPage';
import Bottombar from '@/components/bottombar/Bottombar';

interface LoginPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const errorMessage = searchParams.error;

  return (
    <>
      <Topbar title="Login" />
      <MainPage>
        <div className={styles.bannerSpace}>
            { errorMessage && <NotificationBanner type='error' message={errorMessage.toString()}/> }
        </div>
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
          <TextButton formAction={login} text="Log In" />
        </form>
      </MainPage>
      <Bottombar />
    </>
  );
}
