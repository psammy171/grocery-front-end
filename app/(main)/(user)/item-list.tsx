import { useAppSelector } from "@/store";
import { Item } from "@/types/Item";

const ItemComponent = ({
  item,
  quantity,
}: {
  item: Item;
  quantity: number;
}) => {
  return (
    <div className="flex border rounded p-3">
      <div className="flex-grow">
        <p className="text-lg font-semibold">{item.name}</p>
        <p>{item.price}</p>
      </div>
      <div className="shrink-0">
        <span className="border flex gap-1 bg-gray-100 rounded">
          <span className="w-5 h-5 text-center cursor-pointer">-</span>
          <span className="w-5 text-center">{quantity}</span>
          <span className="w-5 h-5 text-center cursor-pointer">+</span>
        </span>
      </div>
    </div>
  );
};

const ItemList = () => {
  const items = useAppSelector((state) => state.items.items);
  const loading = useAppSelector((state) => state.items.loading);

  return (
    <div>
      {loading && <p>Fetching items</p>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(({ item, cartQuantity }) => (
            <ItemComponent key={item.id} item={item} quantity={cartQuantity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemList;
