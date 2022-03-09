import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import ErrorSpan from "@components/ErrorSpan";
import Input from "@components/Input";
import Layout from "@components/Layout";
import SubmitButton from "@components/SubmitButton";
import { authTokenVar, LOCALSTORAGE_TOKEN } from "@libs/client/apollo";
import { LOGIN_MUTATION } from "@libs/server/mutations/login.gql";
import {
  login,
  loginVariables,
} from "@libs/server/mutations/__generated__/login";

interface ILogin {
  email: string;
  password: string;
  stateError?: string;
}

const Login: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>();
  const [mutate, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login: { ok, error, token } }) => {
        if (ok && token) {
          localStorage.setItem(LOCALSTORAGE_TOKEN, token);
          authTokenVar(token);
          router.replace("/");
        } else if (!ok && error) {
          setError("stateError", {
            message: error,
          });
        }
      },
    }
  );
  const onSubmit: SubmitHandler<ILogin> = (data) => {
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
    <Layout title="Login" isAuthPage>
      <div className="flex justify-center items-center py-20">
        <div className="w-96 space-y-2">
          <h3 className="text-2xl">이메일과 비밀번호가 어떻게 되시나요?</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              register={register("email")}
            />
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              register={register("password")}
            />

            <SubmitButton loading={loading} payload="로그인" />
            {errors.stateError && errors.stateError.message && (
              <ErrorSpan message={errors.stateError.message} />
            )}
          </form>
          <div className="flex text-sm justify-center items-center">
            <span className="mr-3">아직 가입이 안되어 있나요?</span>
            <span
              onClick={() => router.push("/auth/create-account")}
              className="font-semibold hover:underline text-green-600 cursor-pointer"
            >
              회원가입 하러가기
            </span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
