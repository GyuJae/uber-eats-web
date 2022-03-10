import { useSubscription } from "@apollo/client";
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
                    <span className="font-semibold">Address:</span>{" "}
                    <span>{order.address}</span>
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
