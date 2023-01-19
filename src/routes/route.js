import { Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import Home from "../pages/Home";
import Artist from "../pages/Artist";
import Proflie from "../pages/Proflie";
import AlbumDetail from "../pages/AlbumDetail";
import ZingChartWeek from "../pages/ZingChartWeek";
import ZingChartSong from "../pages/ZingChartSong";
import SearchPage from "../pages/Search/SearchPage";
import SearchAll from "../pages/Search/SearchAll";
import SearchSong from "../pages/Search/SearchSong";
import SearchAlbum from "../pages/Search/SearchAlbum";
import ArtistPageSong from "../pages/Search/Artist/ArtistPageSong";
import { getChartHome } from "../api/getChartHome";

function RouteLayout() {
  const [chartHome,setChartHome] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  React.useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const res = await getChartHome();
      
      setChartHome(res?.data?.data?.weekChart);
      setIsLoading(false)
    };
    fetch();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/artist" element={<Artist />} />
      <Route path="/profile" element={<Proflie />} />
      <Route path="/playlist/:title/:id" element={<AlbumDetail />} />
      <Route path="/album/:title/:id" element={<AlbumDetail />} />
      <Route path="/bai-hat/:title/:id" element={<AlbumDetail />} />
      <Route path="/zing-chart-tuan/:title/:id" element={<ZingChartWeek isLoading={isLoading} weekChart={chartHome && Object.values(chartHome)} />}>
      

      </Route>
      {/* <Route path="/zing-chart-tuan/:title/:id" element={<ZingChartWeek />} /> */}
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
