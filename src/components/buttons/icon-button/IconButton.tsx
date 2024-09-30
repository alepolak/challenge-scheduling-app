'use client'
import React, { ButtonHTMLAttributes } from 'react';
import styles from './IconButton.module.css';

export interface IconButtonPropType extends ButtonHTMLAttributes<HTMLButtonElement>{
    icon: string;
}

const IconButton: React.FC<IconButtonPropType> = (props) => {
    return (
        <button className={`${styles.icon} ${styles.button}`} {...props}> { props.icon } </button>
    );
};

export default IconButton;