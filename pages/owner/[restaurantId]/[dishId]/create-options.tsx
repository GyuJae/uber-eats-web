import { useMutation } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { EDIT_DISH_MUTATION } from "@libs/server/mutations/edit-dish.gql";
import {
  editDish,
  editDishVariables,
} from "@libs/server/mutations/__generated__/editDish";

import { useForm, useFieldArray } from "react-hook-form";
import Layout from "@components/Layout";
import { FormEventHandler, useState } from "react";
import ErrorSpan from "@components/ErrorSpan";
import { Role } from "__generated__/globalTypes";

type OptionNameValues = {
  options: {
    optionName: string;
  }[];
  formError?: string;
};

export interface IChoiceState {
  id: number;
  optionName: string;
  name: string;
  extra: number;
}

interface IEditDishVariables {
  optionName: string;
  choices: {
    name: string;
    extra: number;
  }[];
}

const CreateOptions: NextPage = () => {
  const router = useRouter();
  const {
    query: { dishId, restaurantId },
  } = router;
  const [mutate, { loading }] = useMutation<editDish, editDishVariables>(
    EDIT_DISH_MUTATION,
    {
      onCompleted: ({ editDish: { ok, error } }) => {
        if (ok) {
          router.replace(`/owner/restaurants/${restaurantId}`);
        } else if (!ok && error) {
          setError("formError", {
            message: error,
          });
        }
      },
    }
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<OptionNameValues>({
    mode: "onBlur",
  });

  const { register: choiceRegister, getValues: choiceGetValues } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control,
  });
  const onSubmit = ({ options }: OptionNameValues) => {
    const editDishVariables: IEditDishVariables[] = [];
    options.forEach((option) => {
      const optionName = option.optionName;
      const choices = selectChoices
        .filter((choice) => choice.optionName === optionName)
        .map((choice) => ({ name: choice.name, extra: choice.extra }));
      editDishVariables.push({ optionName, choices });
    });
    mutate({
      variables: {
        input: {
          dishId: +(dishId as string),
          options: editDishVariables,
        },
      },
    });
  };

  const [choices, setChoices] = useState<IChoiceState[]>([]);
  const [selectChoices, setSelectChoices] = useState<IChoiceState[]>([]);

  const onMoreChoice = (optionName: string) => {
    setChoices((prev) => [
      ...prev,
      { id: Date.now(), optionName, name: "", extra: 0 },
    ]);
  };

  const onDeleteChoice = (choiceId: number) => {
    setChoices((prev) => prev.filter((choice) => choice.id !== choiceId));
  };

  const onSubmitChoice = ({
    choiceId,
    optionIndex,
  }: {
    choiceId: number;
    optionIndex: number;
  }) => {
    setSelectChoices((prev) => [
      ...prev,
      {
        id: choiceId,
        name: choiceGetValues(`choice-${choiceId}-name`),
        extra: choiceGetValues(`choice-${choiceId}-extra`),
        optionName: getValues(`options.${optionIndex}.optionName`),
      },
    ]);
    onDeleteChoice(choiceId);
  };

  return (
    <Layout isAuthPage title="Create Options" isRole={Role.Owner}>
      <div className="px-4 py-5 max-w-xl mx-auto space-y-4">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() =>
              append({
                optionName: "",
              })
            }
            className="p-1 bg-green-300 hover:bg-green-400 text-green-700 font-semibold cursor-pointer rounded-sm"
          >
            Menu Option Append
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 ">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="px4 py-2 flex   shadow-md w-full  "
              >
                <section
                  className="space-y-2 px-3 flex flex-col w-full "
                  key={field.id}
                >
                  <div className="space-y-2 w-full ">
                    <input
                      type="text"
                      placeholder="Option Name "
                      {...register(`options.${index}.optionName` as const, {
                        required: true,
                      })}
                      className="px-2 py-3 w-full bg-gray-50 border-2 rounded-sm focus:outline-green-500"
                      autoComplete="off"
                    />
                    {selectChoices.filter(
                      (choice) =>
                        choice.optionName ===
                        getValues(`options.${index}.optionName`)
                    ).length > 0 && (
                      <table className="table-auto ">
                        <tbody>
                          {selectChoices
                            .filter(
                              (choice) =>
                                choice.optionName ===
                                getValues(`options.${index}.optionName`)
                            )
                            .map((choice) => (
                              <tr key={choice.id} className="flex gap-3 mt-2">
                                <td className="font-semibold">{choice.name}</td>
                                <td className="text-gray-600">
                                  $ {choice.extra}
                                </td>
                                <td
                                  onClick={() => {
                                    setSelectChoices((prev) =>
                                      prev.filter(
                                        (item) => item.id !== choice.id
                                      )
                                    );
                                  }}
                                  className="p-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold cursor-pointer rounded-sm"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                    {choices
                      .filter(
                        (choice) =>
                          choice.optionName ===
                          getValues(`options.${index}.optionName`)
                      )
                      .map((choice) => (
                        <div key={choice.id} className="space-x-2">
                          <input
                            type="text"
                            placeholder="choice name"
                            {...choiceRegister(`choice-${choice.id}-name`, {
                              required: true,
                            })}
                          />
                          <input
                            type="number"
                            placeholder="choice extra"
                            {...choiceRegister(`choice-${choice.id}-extra`, {
                              required: true,
                              valueAsNumber: true,
                            })}
                          />
                          <button
                            onClick={() => {
                              onSubmitChoice({
                                choiceId: choice.id,
                                optionIndex: index,
                              });
                            }}
                            className="p-1 bg-green-300 hover:bg-green-400 text-green-700 font-semibold cursor-pointer rounded-sm text-xs"
                          >
                            Select
                          </button>
                          <button
                            onClick={() => onDeleteChoice(choice.id)}
                            className="p-1 bg-red-300 hover:bg-red-400 text-red-700 font-semibold cursor-pointer rounded-sm text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => {
                        onMoreChoice(getValues(`options.${index}.optionName`));
                      }}
                      className="p-1 bg-green-300 hover:bg-green-400 text-green-700 font-semibold cursor-pointer rounded-sm text-xs"
                    >
                      Choice Append
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                        setSelectChoices((prev) =>
                          prev.filter(
                            (choice) =>
                              choice.optionName !==
                              getValues(`options.${index}.optionName`)
                          )
                        );
                      }}
                      className="p-1 bg-red-300 hover:bg-red-400 text-red-700 font-semibold cursor-pointer rounded-sm text-xs"
                    >
                      Option Delete
                    </button>
                  </div>
                </section>
              </div>
            );
          })}
          {errors.formError && errors.formError.message && (
            <div className="py-1">
              <ErrorSpan message={errors.formError.message} />
            </div>
          )}
          <button
            type="submit"
            className="py-2 hover:brightness-75 w-full bg-black text-white font-medium cursor-pointer rounded-sm"
          >
            {loading ? "loading..." : "옵션 작성"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateOptions;
