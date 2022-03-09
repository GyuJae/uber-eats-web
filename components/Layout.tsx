import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMe } from "../libs/client/hooks/useMe";
import { classToString } from "../libs/client/utils";
import HeaderMenu from "./HeaderMenu";
import OrdersBasket from "./OrdersBasket";

interface ILayout {
  children: React.ReactNode;
  title: string;
  isAuthPage?: boolean;
}

interface IStateOpenMenu {
  isOpen: boolean;
  modalAnimation: "modalInit" | "modalClose";
  menuAnimation: "menuInit" | "menuClose";
}

interface ISearch {
  keyword: string;
}

const Layout: React.FC<ILayout> = ({ children, title, isAuthPage = false }) => {
  const router = useRouter();

  const { data } = useMe();

  const { register, handleSubmit } = useForm<ISearch>();

  const onSubmit: SubmitHandler<ISearch> = ({ keyword }) => {
    router.push(`/restaurants/search?keyword=${keyword}`);
  };

  const [isOpenMenu, setOpenMenu] = useState<IStateOpenMenu>({
    isOpen: false,
    modalAnimation: "modalInit",
    menuAnimation: "menuInit",
  });

  return (
    <div className="relative">
      <Head>
        <title>{title} | Uber Eats</title>
      </Head>

      {isOpenMenu.isOpen && (
        <HeaderMenu menuAnimation={isOpenMenu.menuAnimation} />
      )}
      {isOpenMenu.isOpen && (
        <div
          onClick={() => {
            setOpenMenu({
              isOpen: false,
              modalAnimation: "modalClose",
              menuAnimation: "menuClose",
            });
          }}
          className={`absolute w-screen h-screen z-30 bg-black opacity-60 ${isOpenMenu.modalAnimation}`}
        />
      )}

      <header
        className={classToString(
          "flex justify-between px-10  items-center",
          isAuthPage ? "bg-black py-4" : "border-b-2 py-5"
        )}
      >
        <div className="flex items-center space-x-8 ">
          {!isAuthPage && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                setOpenMenu({
                  isOpen: true,
                  modalAnimation: "modalInit",
                  menuAnimation: "menuInit",
                });
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={isAuthPage ? "35" : "40"}
            width={isAuthPage ? "130" : "145"}
            viewBox="0.19000000000000128 0.25 367.46 61.17460741747068"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          >
            <g fill="none">
              <path
                fill="#05c167"
                d="M194.32.25h40.87v10h-29.83v14.2h29v9.66h-29v14.44h29.83v10h-40.87zM348.06 59.6c12.53 0 19.59-6 19.59-14.24 0-5.87-4.18-10.25-12.93-12.15l-9.25-1.89c-5.37-1-7.06-2-7.06-4 0-2.59 2.59-4.18 7.36-4.18 5.17 0 9 1.39 10 6.17h10.84c-.59-9-7.06-14.94-20.18-14.94-11.34 0-19.3 4.68-19.3 13.75 0 6.27 4.38 10.35 13.83 12.34l10.34 2.39c4.08.8 5.17 1.9 5.17 3.59 0 2.69-3.08 4.38-8.06 4.38-6.26 0-9.84-1.39-11.23-6.17h-10.9c1.59 8.98 8.25 14.95 21.78 14.95zm-24.93-1.09H311.4c-7.36 0-11.44-4.58-11.44-10.36v-22.9h-8.25v-9.76H300V3.24h10.9v12.25h12.23v9.76H310.9v20.11c0 2.29 1.59 3.39 4.08 3.39h8.15zm-47-43v3.88a21.16 21.16 0 0 0-13.73-5 22.61 22.61 0 1 0 0 45.21 21.1 21.1 0 0 0 13.73-5v3.89H287v-43zM263.3 50.16a13.15 13.15 0 1 1 13-13.14 13 13 0 0 1-13.02 13.12z"
              ></path>
              <path
                fill={classToString(isAuthPage ? "#fff" : "#000")}
                d="M170.06 23.56c-5.47 0-9.35 4.28-9.35 10.85v24.1h-8.35V16.09h8.25v5.18a11.19 11.19 0 0 1 9.94-5.48h3v7.77zM146.59 37.3c0-12.65-9-22.11-21.18-22.11a21.83 21.83 0 0 0-21.68 22.11c0 12.64 9.75 22.2 22.47 22.2a22.17 22.17 0 0 0 18.3-9.06L138.44 46a14.78 14.78 0 0 1-12.24 6.17 14.22 14.22 0 0 1-14-12.14h34.41zm-34.21-3.89c1.49-6.47 6.66-10.85 12.93-10.85s11.43 4.38 12.83 10.85zm-35.1-18.22a21.12 21.12 0 0 0-15 6.27V.25h-8.35v58.26h8.25v-5.38A21.45 21.45 0 0 0 77.3 59.5a22.16 22.16 0 1 0 0-44.31zm-.6 36.85A14.69 14.69 0 1 1 91.3 37.4 14.58 14.58 0 0 1 76.68 52zm-53.5-.4c8.06 0 14.32-6.18 14.32-15.44V.25h8.65v58.26H37.6V53a21.24 21.24 0 0 1-15.41 6.47c-12.43 0-22-9.06-22-22.8V.25H9v36c0 9.31 6 15.39 14.18 15.39z"
              ></path>
            </g>
          </svg>
        </div>
        {!isAuthPage && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative hidden xl:block"
          >
            <input
              placeholder="Food, gorceries, drinks, etc"
              className="bg-gray-200 w-[660px] py-2 px-10 rounded-3xl focus:outline-none"
              autoComplete="off"
              {...register("keyword")}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 absolute top-3 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        )}
        {!isAuthPage && (
          <div className="flex items-center space-x-4 relative">
            {data?.whoAmI.id ? null : (
              <div
                onClick={() => router.push("/auth/login")}
                className="font-medium text-sm cursor-pointer px-2 py-2 rounded-3xl bg-gray-100 hover:bg-gray-200"
              >
                Sign in
              </div>
            )}
          </div>
        )}
      </header>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
