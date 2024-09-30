import React from 'react';
import styles from './Topbar.module.css';

interface TopbarPropType {
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    title: string;
};

const Topbar: React.FC<TopbarPropType> = (props) => {
    return (
        <div className={styles.topBar}>
            <div className={styles.buttonContainer}>
                { props.leftButton }
            </div>
            <h1 className={styles.title}> {props.title} </h1>
            <div className={styles.buttonContainer}>
                { props.rightButton }
            </div>
        </div>
    )
};

export default Topbar;