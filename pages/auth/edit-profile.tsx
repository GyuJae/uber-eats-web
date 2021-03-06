import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "@components/ErrorSpan";
import Input from "@components/Input";
import Layout from "@components/Layout";
import SubmitButton from "@components/SubmitButton";
import { useMe } from "@libs/client/hooks/useMe";
import { EDIT_PROFILE_MUTATION } from "@libs/server/mutations/edit-profile.gql";
import {
  editProfile,
  editProfileVariables,
} from "@libs/server/mutations/__generated__/editProfile";
import { WHOAMI_QUERY } from "@libs/server/queries/whoAmI.gql";
import { Role } from "../../__generated__/globalTypes";
import { useRouter } from "next/router";

interface IEditProfile {
  email?: string;
  password?: string;
  role?: Role;
  stateError?: string;
}

const EditProfile: NextPage = () => {
  const { data } = useMe();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IEditProfile>();
  const [mutate, { loading }] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted: (data) => {
        if (!data.editProfile.ok && data.editProfile.error) {
          setError("stateError", {
            message: data.editProfile.error,
          });
        }
        router.push("/");
      },
      refetchQueries: [WHOAMI_QUERY, "whoAmI"],
    }
  );

  const onSubmit: SubmitHandler<IEditProfile> = (data) => {
    if (loading) return;
    mutate({
      variables: {
        input: {
          ...data,
        },
      },
    });
  };

  useEffect(() => {
    if (data?.whoAmI.email) setValue("email", data.whoAmI.email);
    if (data?.whoAmI.role) setValue("role", data.whoAmI.role);
  }, [data?.whoAmI.email, data?.whoAmI.role, setValue]);

  return (
    <Layout title="Edit Profile" isAuthPage isEditPage>
      <div className=" py-20 flex flex-col justify-center items-center space-y-3">
        <h3 className="text-2xl w-96">
          ????????? ?????? ??????????????? ?????? ???????????????????
        </h3>
        <form className="w-96 space-y-2" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="flex py-1 ">
            <label htmlFor="role" className="font-semibold mr-4">
              Role
            </label>
            <select
              id="role"
              className="px-1 border-black border-2 focus:outline-none"
              {...register("role", { required: true })}
            >
              <option value="Client">Client</option>
              <option value="Delivery">Delivery</option>
              <option value="Owner">Owner</option>
            </select>
          </div> */}
          <Input
            type="email"
            placeholder="???????????? ???????????????"
            register={register("email")}
          />
          <Input
            type="password"
            placeholder="??????????????? ???????????????"
            register={register("password")}
          />
          <SubmitButton loading={loading} payload="????????????" />
          {errors.stateError && errors.stateError.message && (
            <ErrorSpan message={errors.stateError.message} />
          )}
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
