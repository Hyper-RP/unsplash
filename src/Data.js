import React, { useEffect } from "react";

const images = [];

 function Data() {
  useEffect(() => {
    async function fetch() {
      let data = await fetch(
        "https://api.unsplash.com/photos/?client_id=4gwXG5urvcklOQqXdCY_iv5StHDeQXtWOHcqTpTRtxU",
      );
      let res = await data.json();
      res.map((item) => {
        images.push(item.urls.full);
      });
    }
    fetch();
  }, []);
  console.log("images : ", images);
  return images;
}

// 4gwXG5urvcklOQqXdCY_iv5StHDeQXtWOHcqTpTRtxU
