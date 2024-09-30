'use client'
import React, { ButtonHTMLAttributes } from 'react';
import styles from './TextButton.module.css';

export interface TextButtonPropType extends ButtonHTMLAttributes<HTMLButtonElement>{
    text: string;
    kind?: 'primary' | 'secundary';
}

const TextButton: React.FC<TextButtonPropType> = (props) => {
    return (
        <button className={`${styles.button} ${styles[`${props.kind ?? 'secundary'}`]}`} {...props}> { props.text } </button>
    );
};

export default TextButton;