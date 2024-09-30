'use client'
import Topbar from '@/components/topbar/Topbar';
import Link from 'next/link';

export default function LoginErrorPage(){

  return (
    <>
      <Topbar title="Login" />
      <div> Something went wrong with the login </div>
      <Link href={`/login`}> Try again </Link>
    </>
  );
}
