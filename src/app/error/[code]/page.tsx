'use client'
import Topbar from '@/components/topbar/Topbar'
import Link from 'next/link'
import { useParams } from 'next/navigation';
import styles from './style.module.css';
 
export default function ErrorCodePage() {
    const { code: errorCode } = useParams();

    return (
        <>
            <Topbar title='Sorry'/>
            <div className={styles.errorPage}>
                <div>
                    <h2> Something went wrong </h2>
                    <p> Erorr: {errorCode} </p>
                    <Link href="/">Return Home</Link>
                </div>
            </div>
        </>
    )
}