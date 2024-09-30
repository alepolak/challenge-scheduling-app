import React from 'react';
import styles from './Bottombar.module.css';
import Link from 'next/link';

export default async function Bottombar() {
    return (
        <div className={styles.bottomBar}>
            <div className={styles.bottomButtons}>
                <Link href="/">🏠</Link>
            </div>
        </div>
    );
};