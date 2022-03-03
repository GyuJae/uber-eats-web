import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "../../components/ErrorSpan";
import Input from "../../components/Input";
import Layout from "../../components/Layout";
import SubmitButton from "../../components/SubmitButton";
import { classToString } from "../../libs/client/utils";
import { CREATE_RESTAURANT_MUTATION } from "../../libs/server/mutations/create-restaurant.gql";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../libs/server/mutations/__generated__/createRestaurant";

interface ICreateRestaurant {
  name: string;
  address: string;
  coverImg: FileList;
  categoryName: string;
  stateError?: string;
}

const CreateRestaurant: NextPage = () => {
  const router = useRouter();
  const [previewCover, setPreviweCover] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<ICreateRestaurant>();
  const [mutate, { loading }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted: ({ createRestaurant: { ok, error } }) => {
      if (ok) {
        router.replace("/");
      }
      if (!ok && error) {
        setError("stateError", {
          message: error,
        });
      }
    },
  });

  const coverImgWatch = watch("coverImg");
  const [coverObject, setCoverObject] = useState<boolean>(true);

  useEffect(() => {
    if (coverImgWatch && coverImgWatch.length) {
      const file = coverImgWatch[0];
      setPreviweCover(URL.createObjectURL(file));
    }
  }, [coverImgWatch]);

  const onSubmit: SubmitHandler<ICreateRestaurant> = async ({ ...data }) => {
    if (loading) return;
    const { uploadURL } = await (
      await fetch("/api/files", { method: "POST" })
    ).json();
    const form = new FormData();
    form.append("file", data.coverImg[0], data.name);
    const {
      result: { id },
    } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
    mutate({
      variables: {
        input: {
          ...data,
          coverImg: id,
        },
      },
    });
  };

  return (
    <Layout title="Create Restaurant" isAuthPage>
      <div className="flex pt-20 pb-80 justify-center items-center bg-black h-full space-x-6">
        <div className="text-white w-[450px] space-y-12">
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
          <div className="text-2xl py-4">시작하기</div>
          <Input
            type="text"
            placeholder="매장 이름"
            register={register("name")}
          />
          <Input
            type="text"
            placeholder="매장 주소"
            register={register("address")}
          />

          <Input
            type="text"
            placeholder="매장 카테고리"
            register={register("categoryName")}
          />
          {previewCover ? (
            <div
              className="relative pb-80 bg-black"
              onClick={() => setCoverObject((prev) => !prev)}
            >
              <Image
                src={previewCover}
                className={classToString(
                  "w-full text-gray-600 h-46 rounded-md",
                  coverObject ? "object-cover" : "object-scale-down"
                )}
                layout="fill"
                alt="preview photo"
              />
            </div>
          ) : (
            <div className=" py-2 my-2">
              <label
                htmlFor="coverImg"
                className="cursor-pointer border-2 p-2 mt-2 rounded-md font-semibold"
              >
                {" "}
                Cover Image
              </label>
            </div>
          )}
          <input
            id="coverImg"
            type="file"
            accept="images"
            placeholder=""
            className="hidden"
            {...register("coverImg")}
          />
          <SubmitButton loading={loading} payload="제출" />
          {errors.stateError && errors.stateError.message && (
            <ErrorSpan message={errors.stateError.message} />
          )}
        </form>
      </div>
    </Layout>
  );
};

export default CreateRestaurant;