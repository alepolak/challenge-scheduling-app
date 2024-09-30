import Topbar from "@/components/topbar/Topbar";
import MainPage from "@/components/main-page/MainPage";
import Bottombar from "@/components/bottombar/Bottombar";
import styles from "./page.module.css";

export default async function Home() {

  return (
    <>
      <Topbar title="Home Page"/>
      <MainPage>
        <div>
           something
        </div>
      </MainPage>
      <Bottombar/>
    </>
  );
}