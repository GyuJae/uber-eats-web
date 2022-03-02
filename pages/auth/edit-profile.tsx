import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { useMe } from "../../libs/client/hooks/useMe";
import { EDIT_PROFILE_MUTATION } from "../../libs/server/mutations/edit-profile.gql";
import {
  editProfile,
  editProfileVariables,
} from "../../libs/server/mutations/__generated__/editProfile";
import { WHOAMI_QUERY } from "../../libs/server/queries/whoAmI.gql";
import { Role } from "../../__generated__/globalTypes";

interface IEditProfile {
  email?: string;
  password?: string;
  role: Role;
}

const EditProfile: NextPage = () => {
  const { data } = useMe();
  const { register, handleSubmit, setValue } = useForm<IEditProfile>();
  const [mutate, { loading }] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {
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
    <Layout title="Edit Profile" isAuthPage>
      <div className=" py-20 flex flex-col justify-center items-center space-y-3">
        <h3 className="text-2xl w-96">
          이메일, Role 혹은 비밀번호를 변경 하시겠습니까?
        </h3>
        <form className="w-96 space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex py-1 ">
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
          </div>
          <input
            type="email"
            className="bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
            placeholder="이메일을 입력하세요"
            autoComplete="off"
            {...register("email")}
          />
          <input
            type="password"
            className="bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
            {...register("password")}
          />
          <button className="bg-black w-full text-white text-base py-2 rounded-sm inline-block">
            {loading ? "loading..." : "변경하기"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
