import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../Pages/Home";
import Artist from "../Pages/Artist";
import Proflie from "../Pages/Proflie";
import AlbumDetail from "../Pages/AlbumDetail";

function RouteLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist" element={<Artist />} />
      <Route path="/profile" element={<Proflie />} />
      <Route path="/playlist/:title/:id" element={<AlbumDetail />} />
      <Route path="/album/:title/:id" element={<AlbumDetail />} />

    </Routes>
  );
}

export default RouteLayout;
