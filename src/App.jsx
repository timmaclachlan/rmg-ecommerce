import MainContainer from "./components/MainContainer";

import "./index.css";

import AppProviders from "./components/AppProviders";
import Header from "./components/Header/Header";

function Footer() {
  return (
    <footer>
      <div>This is the footer</div>
    </footer>
  );
}

const App = () => {
  return (
    <AppProviders>
      <Header />
      <MainContainer />
      <Footer />
    </AppProviders>
  );
};

export default App;
