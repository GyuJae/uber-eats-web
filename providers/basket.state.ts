import { atom } from "recoil";

interface IBasketState {
  dishId: number;
  dishOptionId: number;
  optionChoiceId: number;
  count: number;
}

export const basketState = atom<IBasketState[]>({
  key: "basketState",
  default: [],
});
