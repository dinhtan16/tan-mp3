import { Routes, Route } from "react-router-dom";

import React from "react";
import Home from "../Pages/Home";
import Artist from "../Pages/Artist";
import Proflie from "../Pages/Proflie";
import AlbumDetail from "../Pages/AlbumDetail";
import ZingChartWeek from "../Pages/ZingChartWeek";
import ZingChartSong from "../Pages/ZingChartSong";
import SearchPage from "../Pages/Search/SearchPage";
import SearchAll from "../Pages/Search/SearchAll";
import SearchSong from "../Pages/Search/SearchSong";
import SearchAlbum from "../Pages/Search/SearchAlbum";
import ArtistPageSong from "../Pages/Search/Artist/ArtistPageSong";

function RouteLayout() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist" element={<Artist />} />
      <Route path="/profile" element={<Proflie />} />
      <Route path="/playlist/:title/:id" element={<AlbumDetail />} />
      <Route path="/album/:title/:id" element={<AlbumDetail />} />
      <Route path="/bai-hat/:title/:id" element={<AlbumDetail />} />
      <Route path="/zing-chart-tuan/:title/:id" element={<ZingChartWeek />} />
      <Route path="/zing-chart-tuan/:title/:id" element={<ZingChartWeek />} />
      <Route path="/zing-chart" element={<ZingChartSong />} />
      <Route path="/:name/" element={<Artist />}>

      </Route>
      <Route path="/:name/bai-hat" element={<ArtistPageSong />}/>
      <Route path="/nghe-si/:name/bai-hat" element={<ArtistPageSong />}/>

      <Route path="/nghe-si/:name" element={<Artist />} />

      <Route path="/tim-kiem" element={<SearchPage />} >
          <Route path="tat-ca/" element={<SearchAll />} />
          <Route path="bai-hat/" element={<SearchSong />} />
          <Route path="playlist/" element={<SearchAlbum />} />
      </Route>


    </Routes>
  );
}

export default RouteLayout;
