import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

const Input: React.FC<IInput> = ({ type, placeholder, register, ...rest }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
      autoComplete="off"
      {...register}
      {...rest}
    />
  );
};

export default Input;
