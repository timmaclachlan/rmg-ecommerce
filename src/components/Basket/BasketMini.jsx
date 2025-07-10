import { useBasket } from "../../hooks/useBasket";

function BasketMini() {
  const { basketItems } = useBasket();

  return (
    <div>
      <h4>Number of Items: {basketItems.length}</h4>
    </div>
  );
}

export default BasketMini;
