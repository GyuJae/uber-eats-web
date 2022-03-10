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
          bootstrapURLKeys={{ key: "AIzaSyBkKRcXRRL29KJpZOXTEYGR7j5PGbEebRE" }}
          onGoogleApiLoaded={handleApiLoaded}
        >
          <Driver lat={latitude} lng={longitude} />
        </GoogleMapReact>
      </div>
      <div className="px-4 py-3">
        <span className="font-semibold">Take Orders</span>
        <div className="px-4 py-2">{data?.cookedOrders.address}</div>
      </div>
    </Layout>
  );
};

export default Orders;
