import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import ErrorSpan from "@components/ErrorSpan";
import Input from "@components/Input";
import Layout from "@components/Layout";
import SubmitButton from "@components/SubmitButton";
import { classToString } from "@libs/client/utils";
import { CREATE_DISH_MUTATION } from "@libs/server/mutations/create-dish.gql";
import {
  createDish,
  createDishVariables,
} from "@libs/server/mutations/__generated__/createDish";
import { Role } from "__generated__/globalTypes";
import { ALL_RESTAURANT_QUERY } from "@libs/server/queries/allRestaurants.gql";

interface ICreateDish {
  name: string;
  price: number;
  photo: FileList;
  description: string;
  formErrors?: string;
}

const CreateDish: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ICreateDish>();
  const router = useRouter();
  const [mutate, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    {
      onCompleted: ({ createDish: { ok, error, dishId } }) => {
        if (ok && dishId) {
          if (window.confirm("메뉴의 옵션을 추가 하시겠습니까?")) {
            router.replace(`/owner/${restaurantId}/${dishId}/create-options`);
          } else {
            router.push("/");
          }
        } else if (!ok && error) {
          setError("formErrors", {
            message: error,
          });
        }
      },
    }
  );

  const {
    query: { restaurantId },
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

  const onSubmit: SubmitHandler<ICreateDish> = async ({
    name,
    price,
    photo,
    description,
  }) => {
    const { uploadURL } = await (
      await fetch("/api/files", { method: "POST" })
    ).json();
    const form = new FormData();
    form.append("file", photo[0], name);
    const {
      result: { id: photoId },
    } = await (await fetch(uploadURL, { method: "POST", body: form })).json();
    mutate({
      variables: {
        input: {
          name,
          photo: photoId,
          description,
          price,
          restaurantId: +(restaurantId as string),
        },
      },
      refetchQueries: [ALL_RESTAURANT_QUERY, "allRestaurant"],
    });
  };

  return (
    <Layout title="Create Dish" isRole={Role.Owner}>
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
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
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

          {errors.formErrors && errors.formErrors.message && (
            <div className="pb-2">
              <ErrorSpan message={errors.formErrors.message} />
            </div>
          )}
          <SubmitButton loading={loading} payload={"메뉴 작성"} />
        </form>
      </div>
    </Layout>
  );
};

export default CreateDish;
