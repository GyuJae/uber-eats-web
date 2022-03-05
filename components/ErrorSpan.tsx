import React from "react";

interface IErrorSpan {
  message: string;
}

const ErrorSpan: React.FC<IErrorSpan> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center py-1 text-red-500 font-semibold">
      <span>{message}</span>
    </div>
  );
};

export default ErrorSpan;
