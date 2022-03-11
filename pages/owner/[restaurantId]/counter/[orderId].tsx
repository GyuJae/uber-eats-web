import { useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import LoadingPage from "@components/LoadingPage";
import { GET_DETAIL_ORDER_QUERY } from "@libs/server/queries/getDetailOrder.gql";
import {
  getDetailOrder,
  getDetailOrderVariables,
} from "@libs/server/queries/__generated__/getDetailOrder";
import { Role } from "__generated__/globalTypes";

const CounterDetail: NextPage = () => {
  const router = useRouter();
  const {
    query: { orderId },
  } = router;
  const { data, loading, error } = useQuery<
    getDetailOrder,
    getDetailOrderVariables
  >(GET_DETAIL_ORDER_QUERY, {
    variables: {
      input: {
        orderId: +(orderId as string),
      },
    },
  });
  console.log(data, loading, error);
  return (
    <Layout title="Counter Detail" isRole={Role.Owner}>
      {loading ? (
        <LoadingPage />
      ) : (
        <div>
          {data?.getDetailOrder.order?.orderItems.map((item) => (
            <div key={item.dish.id}>
              <div>{item.dish.name}</div>
              {item.selectOptionChoices.map((optionAndChoice) => (
                <div key={optionAndChoice.option.id}>
                  <span>{optionAndChoice.option.name}</span>
                  <span>{optionAndChoice.choice.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default CounterDetail;
