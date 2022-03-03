interface IOrdersBaseket {
  setOrdersBasket: any;
}

const OrdersBasket: React.FC<IOrdersBaseket> = ({ setOrdersBasket }) => {
  return (
    <div className="absolute top-14 right-0 w-96 min-h-[280px] bg-white shadow-md overflow-y-auto">
      <svg
        width="36px"
        height="36px"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
        className="absolute top-3 left-3 cursor-pointer active:bg-gray-300 rounded-full p-2"
        onClick={() => setOrdersBasket(false)}
      >
        <path
          d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
          fill="#000000"
        ></path>
      </svg>
    </div>
  );
};

export default OrdersBasket;
