import { useMutation, useSubscription } from "@apollo/client";
import Layout from "@components/Layout";
import useCoords from "@libs/client/hooks/useCoords";
import { COOKED_ORDERS_SUBSCRIPTION } from "@libs/server/subscriptions/cooked-orders.gql";
import {
  cookedOrders,
  cookedOrders_cookedOrders,
} from "@libs/server/subscriptions/__generated__/cookedOrders";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { TAKE_ORDER_MUTATION } from "@libs/server/mutations/take-order.gql";
import {
  takeOrder,
  takeOrderVariables,
} from "@libs/server/mutations/__generated__/takeOrder";
import { OrderStatus } from "__generated__/globalTypes";

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}
const Driver: React.FC<IDriverProps> = () => <div className="text-lg">🚖</div>;
const Order: React.FC<IDriverProps> = () => <div className="text-lg">🍔</div>;

const Orders: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();
  const { data, loading } = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );
  const [orders, setOrders] = useState<cookedOrders_cookedOrders[]>([]);
  const [mutate, { loading: takeOrderLoading }] = useMutation<
    takeOrder,
    takeOrderVariables
  >(TAKE_ORDER_MUTATION);

  useEffect(() => {
    if (data?.cookedOrders) {
      setOrders((prev) => [...prev, data.cookedOrders]);
    }
  }, [data?.cookedOrders]);
  const handleApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    map.panTo(new google.maps.LatLng(latitude, longitude));
    setMap(map);
    setMaps(maps);
  };
  useEffect(() => {
    if (map && maps) {
      map.panTo(new maps.LatLng(latitude, longitude));
    }
  }, [latitude, longitude, map, maps]);

  // const onGetRouteClick = () => {
  //   if (map) {
  //     const directionsService = new google.maps.DirectionsService();
  //     const directionsRender = new google.maps.DirectionsRenderer({
  //       polylineOptions: {
  //         strokeColor: "#000",
  //         strokeOpacity: 1,
  //         strokeWeight: 40,
  //       },
  //     });
  //     directionsRender.setMap(map);
  //     directionsService.route(
  //       {
  //         origin: {
  //           location: new google.maps.LatLng(latitude, longitude),
  //         },
  //         destination: {
  //           location: new google.maps.LatLng(latitude + 0.05, longitude + 0.05),
  //         },
  //         travelMode: google.maps.TravelMode.DRIVING,
  //       },
  //       (result) => {
  //         directionsRender.setDirections(result);
  //       }
  //     );
  //   }
  // };

  const onTakeOrder = (orderId: number) => {
    mutate({
      variables: {
        input: {
          orderId,
        },
      },
    });
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <Layout title="Take Orders" isAuthPage>
      <div className="w-full h-[50vh]">
        <GoogleMapReact
          defaultZoom={17}
          draggable={true}
          defaultCenter={{
            lat: latitude || 0,
            lng: longitude || 0,
          }}
          bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY || "" }}
          onGoogleApiLoaded={handleApiLoaded}
        >
          <Driver lat={latitude} lng={longitude} />
        </GoogleMapReact>
      </div>
      <div className="p-4">
        <span className="font-semibold">Take Orders</span>
        <div className="px-4 py-2">
          {loading ? (
            "loading..."
          ) : (
            <div className="p-4 pb-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
              {orders.map((order) => (
                <div key={order.id} className="w-full h-[300px]">
                  <GoogleMapReact
                    defaultZoom={17}
                    draggable={true}
                    defaultCenter={{
                      lat: order.lat || 0,
                      lng: order.lon || 0,
                    }}
                    bootstrapURLKeys={{
                      key: process.env.GOOGLE_API_KEY || "",
                    }}
                  >
                    <Order lat={order.lat || 0} lng={order.lon || 0} />
                  </GoogleMapReact>{" "}
                  <div className="mt-2">
                    <span className="font-semibold text-sm">Address:</span>{" "}
                    <span className="text-xs">{order.address}</span>
                    <div
                      onClick={() => {
                        if (order.status === OrderStatus.Cooked) {
                          onTakeOrder(order.id);
                        }
                      }}
                      className="bg-green-600 hover:bg-green-700 mt-2 px-2 py-1 flex justify-center rounded-sm shadow-inner cursor-pointer text-white font-semibold"
                    >
                      {order.status === OrderStatus.Cooked
                        ? "Take Order"
                        : order.status === OrderStatus.PickedUp
                        ? "Driving"
                        : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
