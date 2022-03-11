import { useRouter } from "next/router";
import { authTokenVar, LOCALSTORAGE_TOKEN } from "@libs/client/apollo";
import { useMe } from "@libs/client/hooks/useMe";
import { Role } from "../__generated__/globalTypes";

interface IHeaderMenu {
  menuAnimation: "menuInit" | "menuClose";
}

const HeaderMenu: React.FC<IHeaderMenu> = ({ menuAnimation }) => {
  const { data } = useMe();
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    authTokenVar(null);
    router.push("/");
    router.reload();
  };
  return (
    <div
      className={`z-50 absolute overflow-y-auto bg-white w-[300px] h-screen ${menuAnimation}`}
    >
      {data?.whoAmI.id ? (
        <div>
          <div className="border-b-[1px] border-gray-400 px-4">
            <div className="flex flex-col justify-center py-5">
              <span className="text-lg">{data?.whoAmI.email}</span>
              <span
                onClick={() => router.push("/auth/edit-profile")}
                className="font-semibold text-sm cursor-pointer hover:underline text-green-700"
              >
                Edit Profile
              </span>
            </div>
            {data.whoAmI.role === Role.Client && (
              <div className="space-y-5">
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => {
                    router.push(`/${data?.whoAmI.role.toLowerCase()}/orders`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-semibold">Orders</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <span className="font-semibold">Favorites</span>
                  </div>
                </div>
              </div>
            )}
            <div className="py-6">
              {data.whoAmI.id && (
                <span
                  onClick={logout}
                  className="font-medium text-gray-500 cursor-pointer"
                >
                  Sign out
                </span>
              )}
            </div>
          </div>
          {data?.whoAmI.role === Role.Owner && (
            <div className="px-4 py-6">
              <span
                className="font-semibold text-sm cursor-pointer"
                onClick={() => router.push("/owner/create-restaurant")}
              >
                Add your restaurant
              </span>
            </div>
          )}{" "}
        </div>
      ) : (
        <div className="px-4 py-6 space-y-4">
          <div
            onClick={() => router.push("/auth/login")}
            className="font-medium hover:underline underline-offset-2 cursor-pointer"
          >
            Sign in
          </div>
          <div
            onClick={() => router.push("/auth/create-account")}
            className="font-medium hover:underline underline-offset-2 cursor-pointer"
          >
            Sign up
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderMenu;
