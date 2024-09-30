import React from 'react';
import styles from './SlotLinkIcon.module.css';
import Link from 'next/link';

export interface SlotLinkIconPropType {
    icon: string;
    url: string;
}

const SlotLinkIcon: React.FC<SlotLinkIconPropType> = (props) => {
    return (
        <div className={styles.icon}>
            <Link href={props.url}>{props.icon}</Link>
        </div>
    );
};

export default SlotLinkIcon;