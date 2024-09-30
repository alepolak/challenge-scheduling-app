import React from 'react';
import styles from './MainPage.module.css';

interface MainPagePropType {
    children: React.ReactNode;
}

const MainPage: React.FC<MainPagePropType> = async (props) =>{
    return (
        <main className={styles.main}>
            <div className={styles.wrapper}>
                { props.children }
            </div>
        </main>
    );
};

export default MainPage;