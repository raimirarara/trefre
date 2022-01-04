import { Box } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SimpleBottomNavigation from "../components/organizms/BottomNavigation";
import styles from "../styles/Home.module.css";
import GoogleMapReact from "google-map-react";
import { useState } from "react";

const Home: NextPage = () => {
  //APIKEYは""としていれば開発者モードで使えます
  const APIKEY = "";
  const [center, setCenter] = useState({ lat: 50, lng: 50 });
  const [zoom, setZoom] = useState(3);
  return (
    <div className="relative h-screen">
      <Head>
        <title>Traco</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box sx={{ height: 680 }}>
        {/* google-map-reactからimport!
        bootstrapURLKeys,center,zoom値があれば表示されます */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: APIKEY }}
          defaultZoom={zoom}
          center={center}
        ></GoogleMapReact>
      </Box>
      <div className="absolute inset-x-0 bottom-0">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
};

export default Home;
