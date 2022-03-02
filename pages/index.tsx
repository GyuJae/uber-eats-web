import type { NextPage } from "next";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <div className="">
        <span className="font-semibold text-black">Hello world</span>
      </div>
    </Layout>
  );
};

export default Home;
