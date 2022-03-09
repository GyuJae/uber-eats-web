import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "@components/ErrorSpan";
import Input from "@components/Input";
import Layout from "@components/Layout";
import SubmitButton from "@components/SubmitButton";
import { CREATE_ACCOUNT_MUTATION } from "@libs/server/mutations/create-account.gql";
import {
  createAccount,
  createAccountVariables,
} from "@libs/server/mutations/__generated__/createAccount";
import { Role } from "../../__generated__/globalTypes";

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
    <Layout title="Create Account" isAuthPage>
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
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              register={register("email", { required: true })}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              register={register("password", { required: true })}
            />
            <SubmitButton loading={loading} payload="회원가입" />

            {errors.stateError && errors.stateError.message && (
              <ErrorSpan message={errors.stateError.message} />
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
