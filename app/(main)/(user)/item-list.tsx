import { useAppDispatch, useAppSelector } from "@/store";
import { Item } from "@/types/Item";
import { addItemToCart, removeItemFromCart } from "@/store/cart/cart-actions";
import useAxios from "@/lib/api/use-axios";
import SearchIcon from "@/components/icons/search";
import { useState } from "react";

const ItemComponent = ({
  item,
  quantity,
}: {
  item: Item;
  quantity: number;
}) => {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(addItemToCart(item, axios));
  };

  const removeFromCart = () => {
    dispatch(removeItemFromCart(item, axios));
  };

  return (
    <div className="flex border rounded p-3">
      <div className="flex-grow">
        <p className="text-lg font-semibold">{item.name}</p>
        <p>
          {"\u20b9"} {item.price}
        </p>
      </div>
      <div className="shrink-0">
        <span className="border flex gap-1 bg-gray-100 rounded">
          <span
            className="w-5 h-5 text-center cursor-pointer"
            onClick={removeFromCart}
          >
            -
          </span>
          <span className="w-5 text-center">{quantity}</span>
          <span
            className="w-5 h-5 text-center cursor-pointer"
            onClick={addToCart}
          >
            +
          </span>
        </span>
      </div>
    </div>
  );
};

const ItemList = () => {
  const [search, setSearch] = useState<string>("");
  const items = useAppSelector((state) => state.items.items);
  const loading = useAppSelector((state) => state.items.loading);
  const cartItems = useAppSelector((state) => state.cart.items);

  const getCartCount = (item: Item) => {
    const itemFromCart = cartItems.find(
      (cartItem) => cartItem.groceryItemId === item.id
    );
    if (!itemFromCart) return 0;
    return itemFromCart.quantity;
  };

  return (
    <div>
      {loading && <p>Fetching items</p>}
      {!loading && (
        <div>
          <div className="flex justify-center mb-4">
            <div className="mx-auto relative">
              <input
                className="mx-auto peer bg-gray-100 border-none transition-all rounded focus:w-72  focus:ring-2 focus:ring-primary-900 py-2 w-40 pl-8"
                placeholder="Search"
                onChange={(e: any) => setSearch(e.target.value)}
              />
              <SearchIcon className="w-5 h-5 absolute mx-[6px] top-[10px] text-gray-500 peer-focus:text-gray-800 transition-colors duration-300" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items
              .filter((item) =>
                item.name
                  .replaceAll(" ", "")
                  .toLowerCase()
                  .includes(search.replaceAll(" ", "").toLowerCase())
              )
              .map((item) => (
                <ItemComponent
                  key={item.id}
                  item={item}
                  quantity={getCartCount(item)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;
