import { useAtom } from "jotai";
import { cartAtom, totalAtom } from "./shopping-cart-atom";

const ShoppingCart = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [total] = useAtom(totalAtom);

  const addItem = (newItem) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => item.itemName === newItem.itemName
      );
      if (idx !== -1) {
        // Item exists: increase quantity
        const updated = [...prevCart];
        updated[idx].quantity += 1;
        return updated;
      } else {
        // New item
        return [...prevCart, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeItem = (itemName) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.itemName !== itemName)
    );
  };

  const increaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.itemName === itemName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (itemName) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.itemName === itemName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="cart-container">
      <h1>🛒 Shopping Cart</h1>
      <ul className="cart-list">
        {cart.length === 0 ? (
          <li className="empty">Your cart is empty.</li>
        ) : (
          cart.map((item) => (
            <li key={item.itemName} className="cart-item">
              <span>
                {item.itemName} - ${item.price.toFixed(2)} × {item.quantity}
              </span>
              <div className="item-actions">
                <button onClick={() => decreaseQuantity(item.itemName)}>
                  -
                </button>
                <button onClick={() => increaseQuantity(item.itemName)}>
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.itemName)}
                >
                  ✖
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
      <h2 className="total">Total: ${total.toFixed(2)}</h2>
      <div className="actions">
        <button onClick={() => addItem({ itemName: "Apple", price: 0.99 })}>
          🍎 Add Apple
        </button>
        <button onClick={() => addItem({ itemName: "Banana", price: 2.99 })}>
          🍌 Add Banana
        </button>
        <button onClick={() => addItem({ itemName: "Orange", price: 3.99 })}>
          🍊 Add Orange
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
