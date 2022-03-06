import { OrderStatus } from "../../__generated__/globalTypes";

export const classToString = (...classList: string[]) => classList.join(" ");

interface IFileToUrl {
  fileId: string;
  variant: "public";
}

export const fileToUrl = ({ fileId, variant }: IFileToUrl): string =>
  `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${fileId}/${variant}`;

export const orderStatusToKorean = (status: OrderStatus): string => {
  if (status === OrderStatus.Pending) {
    return "배달 접수중";
  } else if (status === OrderStatus.Cooking) {
    return "요리 중";
  } else if (status === OrderStatus.Cooked) {
    return "요리 완성";
  } else if (status === OrderStatus.PickedUp) {
    return "배달 중";
  } else if (status === OrderStatus.Delivered) {
    return "배달 완료";
  }
  return "상태 파악 불가";
};
