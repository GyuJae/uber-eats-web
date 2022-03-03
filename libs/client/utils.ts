export const classToString = (...classList: string[]) => classList.join(" ");

interface IFileToUrl {
  fileId: string;
  variant: "public";
}

export const fileToUrl = ({ fileId, variant }: IFileToUrl): string =>
  `https://imagedelivery.net/ZYLViq3IecpAakTgPse5sg/${fileId}/${variant}`;
