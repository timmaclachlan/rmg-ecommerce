import { BasketProvider } from "../context/BasketContext";
import { CustomerProvider } from "../context/CustomerContext";
import { ThemeContextProvider } from "../context/ThemeContext";

function AppProviders({ children }) {
  return (
    <ThemeContextProvider>
      <CustomerProvider>
        <BasketProvider>{children}</BasketProvider>
      </CustomerProvider>
    </ThemeContextProvider>
  );
}

export default AppProviders;
