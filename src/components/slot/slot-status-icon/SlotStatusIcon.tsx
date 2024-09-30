import React from 'react';
import styles from './SlotStatusIcon.module.css';

export interface SlotStatusIconPropType {
    icon: string;
}

const SlotStatusIcon: React.FC<SlotStatusIconPropType> = (props) => {
    return (
        <div className={styles.icon}>
            <p> {props.icon} </p>
        </div>
    );
};

export default SlotStatusIcon;