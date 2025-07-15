import { Outlet } from "react-router";
import Header from "./Header/Header";

function Footer() {
  return (
    <footer>
      <div>This is the footer</div>
    </footer>
  );
}

function MainContainer() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainContainer;
