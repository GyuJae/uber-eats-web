interface ISubmitButton {
  loading: boolean;
  payload: string;
}

const SubmitButton: React.FC<ISubmitButton> = ({ loading, payload }) => {
  return (
    <button className="bg-black w-full text-white text-base py-2 rounded-sm inline-block">
      {loading ? "loading..." : payload}
    </button>
  );
};

export default SubmitButton;
