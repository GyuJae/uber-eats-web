import LoadingBtn from "@components/LoadingBtn";

interface ISubmitButton {
  loading: boolean;
  payload: string;
}

const SubmitButton: React.FC<ISubmitButton> = ({ loading, payload }) => {
  return (
    <>
      {loading ? (
        <LoadingBtn />
      ) : (
        <button className="bg-black hover:brightness-90 w-full text-white text-base py-2 rounded-sm inline-block">
          {payload}
        </button>
      )}
    </>
  );
};

export default SubmitButton;
