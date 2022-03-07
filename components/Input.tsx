import { UseFormRegisterReturn } from "react-hook-form";
import { classToString } from "../libs/client/utils";

interface IInput {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  classNameAppend?: string;
  [key: string]: any;
}

const Input: React.FC<IInput> = ({
  type,
  placeholder,
  register,
  classNameAppend,
  ...rest
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classToString(
        "bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100",
        classNameAppend ? classNameAppend : ""
      )}
      autoComplete="off"
      {...register}
      {...rest}
    />
  );
};

export default Input;
