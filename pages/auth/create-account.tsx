import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { CREATE_ACCOUNT_MUTATION } from "../../libs/server/mutations/create-account.gql";
import {
  createAccount,
  createAccountVariables,
} from "../../libs/server/mutations/__generated__/createAccount";

enum Role {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

interface ICreateAccount {
  email: string;
  password: string;
  role: Role;
  stateError?: string;
}

const CreateAccount: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ICreateAccount>();
  const [mutate, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: ({ createAccount: { ok, error } }) => {
      if (ok) {
        router.replace("/auth/login");
      } else if (!ok && error) {
        setError("stateError", {
          message: error,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<ICreateAccount> = (data) => {
    if (loading) return;
    mutate({
      variables: {
        input: {
          ...data,
        },
      },
    });
  };

  return (
    <Layout title="Create Account" isAuth>
      <div className="flex justify-center items-center py-20">
        <div className="w-96 space-y-2">
          <h3 className="text-2xl mb-2">
            이메일, 비밀번호와 역할을 정해주세요.
          </h3>
          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex py-1">
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
              {...register("email", { required: true })}
            />
            <input
              type="password"
              className="bg-gray-200 w-full p-2 py-3 focus:outline-[0.5px] focus:bg-gray-100"
              placeholder="비밀번호를 입력하세요"
              autoComplete="off"
              {...register("password", { required: true })}
            />

            <button className="bg-black w-full text-white text-base py-2 rounded-sm inline-block">
              {loading ? "loading..." : "회원가입"}
            </button>
            {errors.stateError && (
              <div className="flex flex-col justify-center items-center py-1 text-red-500 font-semibold">
                {errors.stateError && <span>{errors.stateError.message}</span>}
              </div>
            )}
          </form>
          <div className="flex text-sm justify-center items-center py-5">
            <span className="mr-3">벌써 가입이 되어 있나요?</span>
            <span
              onClick={() => router.push("/auth/login")}
              className="font-semibold hover:underline text-green-600 cursor-pointer"
            >
              로그인 하러가기
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateAccount;
