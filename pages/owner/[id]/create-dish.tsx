import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../../components/Input";
import Layout from "../../../components/Layout";
import SubmitButton from "../../../components/SubmitButton";
import { classToString } from "../../../libs/client/utils";
import { CREATE_DISH_MUTATION } from "../../../libs/server/mutations/create-dish.gql";
import {
  createDish,
  createDishVariables,
} from "../../../libs/server/mutations/__generated__/createDish";

interface ICreateDish {
  name: string;
  price: number;
  photo: FileList;
  description: string;
  [key: string]: any;
}

interface IOptionObj {
  name: string;
  extra: number;
}

const CreateDish: NextPage = () => {
  const { register, handleSubmit, watch, setValue } = useForm<ICreateDish>();
  const router = useRouter();
  const [mutate, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      onCompleted: (data) => {
        console.log(data);
      },
    }
  );

  const {
    query: { id: restaurantId },
  } = router;

  const [previewCover, setPreviweCover] = useState<string | null>(null);
  const photoWatch = watch("photo");
  const [coverObject, setCoverObject] = useState<boolean>(true);

  useEffect(() => {
    if (photoWatch && photoWatch.length) {
      const file = photoWatch[0];
      setPreviweCover(URL.createObjectURL(file));
    }
  }, [photoWatch]);

  const [optionNums, setOptionNums] = useState<number[]>([]);

  const onAddOptionClick = () => {
    setOptionNums((prev) => [...prev, Date.now()]);
  };

  const onDeleteOptionClick = (deleteId: number) => {
    setOptionNums((prev) => prev.filter((item) => item !== deleteId));
    setValue(`${deleteId}-option-name`, undefined);
    setValue(`${deleteId}-option-extra`, undefined);
  };

  const onSubmit: SubmitHandler<ICreateDish> = async ({
    name,
    price,
    photo,
    description,
    ...options
  }) => {
    const { uploadURL } = await (
      await fetch("/api/files", { method: "POST" })
    ).json();
    const form = new FormData();
    form.append("file", photo[0], name);
    const {
      result: { id },
    } = await (await fetch(uploadURL, { method: "POST", body: form })).json();

    Object.keys(options).forEach(
      (key) => options[key] === undefined && delete options[key]
    );
    const optionsContent = optionNums.map((theId) => ({
      content: {
        name: options[`${theId}-option-name`],
        extra: options[`${theId}-option-extra`],
      },
    }));

    mutate({
      variables: {
        input: {
          name,
          photo: id,
          description,
          price,
          restaurantId: +(restaurantId as string),
          options: optionsContent,
        },
      },
    });
  };

  return (
    <Layout isAuthPage title="Create Dish">
      <div className="w-full h-full bg-black flex justify-center items-center pt-10 pb-40 space-x-6">
        <div className="text-white w-[450px] space-y-12 hidden md:block">
          <div className="text-5xl">수많은 고객에게 더 가까이 다가가세요</div>
          <div>
            {" "}
            Uber’s global platform gives you the flexibility, visibility and
            customer insights you need to connect with more customers. Partner
            with us today.
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-[560px] px-10 py-12 bg-white space-y-2"
        >
          <div className="text-2xl py-4">메뉴 만들기</div>
          {previewCover ? (
            <div
              className="relative pb-80 bg-black"
              onClick={() => setCoverObject((prev) => !prev)}
            >
              <Image
                src={previewCover}
                className={classToString(
                  "w-full text-gray-600 h-46",
                  coverObject ? "object-cover" : "object-scale-down"
                )}
                layout="fill"
                alt="preview photo"
              />
            </div>
          ) : (
            <div>
              <label
                htmlFor="photo"
                className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-emerald-600 bg-emerald-200 cursor-pointer last:mr-0 mr-1"
              >
                {" "}
                Menu Photo
              </label>
            </div>
          )}
          <Input
            type="text"
            placeholder="메뉴 이름"
            register={register("name", { required: true })}
          />
          <Input
            type="number"
            placeholder="메뉴 가격"
            register={register("price", { required: true })}
          />

          <input
            id="photo"
            type="file"
            placeholder="photo file"
            {...register("photo", { required: true })}
            className="hidden"
            accept="images"
          />
          <textarea
            className="w-full bg-gray-200 p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
            placeholder="메뉴 설명"
            {...register("description", { required: true })}
          />
          <span
            onClick={onAddOptionClick}
            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-black bg-gray-200 cursor-pointer last:mr-0 mr-1"
          >
            Add Option
          </span>
          {optionNums.length > 0 && (
            <div className="space-y-2">
              {optionNums.map((optionId) => (
                <div key={optionId} className="grid grid-cols-9 gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    {...register(`${optionId}-option-name`)}
                    className="col-span-5 bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
                    autoComplete="off"
                  />
                  <input
                    type="number"
                    placeholder="Extra"
                    {...register(`${optionId}-option-extra`)}
                    className="col-span-3 bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
                    autoComplete="off"
                  />

                  <div
                    onClick={() => {
                      onDeleteOptionClick(optionId);
                    }}
                    className="cursor-pointer bg-red-300 hover:bg-red-400 flex justify-center items-center text-red-900 rounded-md "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
          <SubmitButton loading={loading} payload={"메뉴 작성"} />
        </form>
      </div>
    </Layout>
  );
};

export default CreateDish;
