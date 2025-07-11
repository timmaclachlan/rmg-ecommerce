import Header from "./Header/Header";
import MainContent from "./HomeContent";

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
      <MainContent />
      <Footer />
    </>
  );
}

export default MainContainer;
