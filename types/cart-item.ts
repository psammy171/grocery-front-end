import { Item } from "./Item";

export type CartItem = {
  quantity: number;
  groceryItemId: string;
  orderId: string;
  item: Item;
};
