import Image from "next/image";
import { useRouter } from "next/router";
import { useMe } from "@libs/client/hooks/useMe";
import { fileToUrl } from "@libs/client/utils";
import { allRestaurant_allRestaurant_result } from "@libs/server/queries/__generated__/allRestaurant";
import Food from "@svgs/svgs/Food.svg";

interface IMainRestaurants {
  data?: allRestaurant_allRestaurant_result[] | null;
}

const MainRestaurants: React.FC<IMainRestaurants> = ({ data }) => {
  const router = useRouter();
  const user = useMe();
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-6">
      {data && data.length !== 0 ? (
        data.map((restaurant) => (
          <div
            key={restaurant.id}
            className="space-y-2 cursor-pointer "
            onClick={() =>
              router.push(
                (restaurant.ownerId === user.data?.whoAmI.id
                  ? "/owner"
                  : "/client") + `/restaurants/${restaurant.id}`
              )
            }
          >
            <div className="relative w-full h-64 md:h-60 lg:h-56 xl:h-52">
              <Image
                src={fileToUrl({
                  fileId: restaurant.coverImg,
                  variant: "public",
                })}
                className="h-64 md:h-60 lg:h-56 xl:h-52  bg-gray-400 rounded-md z-0"
                layout="fill"
                alt="preview photo"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span>{restaurant.name}</span>
                <span className="text-gray-500 text-sm">
                  {restaurant.address}
                </span>
              </div>
              <div>
                {user.data?.whoAmI.id === restaurant.ownerId && (
                  <div className="bg-green-300 p-1 flex justify-center items-center rounded-sm">
                    <span className="font-semibold text-xs text-green-900">
                      My Restaurant
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col space-y-10 w-full justify-center items-center absolute py-40 font-semibold">
          <Food />
          <span>Sorry, No Restauransts</span>
        </div>
      )}
    </div>
  );
};

export default MainRestaurants;
