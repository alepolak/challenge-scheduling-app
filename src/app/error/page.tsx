import Bottombar from '@/components/bottombar/Bottombar'
import MainPage from '@/components/main-page/MainPage'
import Topbar from '@/components/topbar/Topbar'
import Link from 'next/link'
 
export default function ErrorPage() {
  return (
    <>
        <Topbar title='Sorry'/>
        <MainPage>
            <div>
                <h2> Something went wrong </h2>
                <p> There was some type of error </p>
                <Link href="/">Return Home</Link>
            </div>
        </MainPage>
        <Bottombar/>
    </>
  )
}