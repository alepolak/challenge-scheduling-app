import React from 'react';
import styles from './Notification.module.css';

export interface NotificationBannerPropType {
    message: string;
    type: 'normal' | 'error';
}

const NotificationBanner: React.FC<NotificationBannerPropType> = ({message, type}) => {
    return (
        <div className={`${styles.notification} ${type === 'error' ? styles.error : styles.normal}`}>
            <p>{`${type === 'error' ? '❌': '❕'} ${message}`}</p>
        </div>
    );
};

export default NotificationBanner;