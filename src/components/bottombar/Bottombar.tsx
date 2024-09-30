"use server"
import React from 'react';
import styles from './Bottombar.module.css';
import Link from 'next/link';
import { getUser } from '@/services/userService';

export default async function Bottombar() {

    const { data: user } = await getUser();

    return (
        <div className={styles.bottomBar}>
            <div className={styles.bottomButtons}>
                { user ?
                    (
                        <>
                            <Link href="/calendar">📅</Link>
                            <Link href="/">🏠</Link>
                            <Link href={"/profile"}>⚙️</Link>
                        </>
                    ) 
                    : 
                    (
                        <>
                            <Link href="/">🏠</Link>
                            <Link href={"/login"}>👤</Link>
                        </>
                    )
                }
            </div>
        </div>
    );
};