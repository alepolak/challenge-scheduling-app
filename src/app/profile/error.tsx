'use client'
import Topbar from '@/components/topbar/Topbar';
import Link from 'next/link';

export default function ProfileErrorPage(){

  return (
    <>
      <Topbar title="Profile" />
      <div> Something went wrong with the profile </div>
      <Link href={`/profile`}> Try again </Link>
    </>
  );
}
