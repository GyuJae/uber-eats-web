import { atom } from "recoil";

interface IBasketState {
  id: number;
  dishId: number;
  optionAndChoice: { optionId: number; choiceId: number }[];
  count: number;
  dishName: string;
  optionAndChoice_name: { optionName: string; choiceName: string }[];
}

export const basketState = atom<IBasketState[]>({
  key: "basketState",
  default: [],
});
