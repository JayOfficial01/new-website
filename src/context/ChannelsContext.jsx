import axios from "axios";
import  { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";


export const ChannelsContext = createContext();

function ChannelsProvider() {
  let [channels, setChannels] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchedItemList, setSearchedItemList] = useState([]);

  const apiKey = "8bab621b03bc46289f9552bd5829f52c";
  // const apiKey = "facabd9a91ae43e48b39f5214937bcb8";

  useEffect(() => {
    getNewsChannelsList();
    getNewsBySearchItem();
  }, []);

  const getNewsChannelsList = async () => {
    await axios
      .get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`)
      .then((res) => {
        setLoading(false);
        setChannels(res?.data?.sources?.slice(0, 10));
      })
      .catch((err) => console.log(err));
  };

  const channelsImage = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABC_News_logo_2021.svg/1200px-ABC_News_logo_2021.svg.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/ABC_News_%282017%29.svg/2560px-ABC_News_%282017%29.svg.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Aftenposten_logo.svg/1280px-Aftenposten_logo.svg.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/1200px-Aljazeera_eng.svg.png",
    },
    {
      img: "https://www.inera.it/wp-content/uploads/2010/06/ansa1.jpg",
    },
    {
      img: "https://argaamplus.s3.amazonaws.com/5318ceae-ddda-4771-97be-3b4d4c78edcc.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Ars_Technica_logo_%282016%29.svg/2560px-Ars_Technica_logo_%282016%29.svg.png",
    },
    {
      img: "https://seeklogo.com/images/A/ary-news-logo-F2E62D53D8-seeklogo.com.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Associated_Press_logo_2012.svg/1200px-Associated_Press_logo_2012.svg.png",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/The-Australian-Financial-Review-Logo.svg/2560px-The-Australian-Financial-Review-Logo.svg.png",
    },
  ];

  channels = channels.map((item, index) => ({
    ...item,
    img: channelsImage[index] ? channelsImage[index].img : null,
  }));


  const getNewsChannelsById = async (ids) => {
  
    const promises = ids.map(id =>
      axios.get(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=${apiKey}`)
    );
  
    try {
      const responses = await Promise.all(promises);
      const articles = responses.map(res => res.data.articles);
      setLoading(false);
      setArticles(articles.flat());
    } catch (err) {
      console.log(err);
    }
  };

  const getNewsBySearchItem = async (item) => {
    await axios
      .get(
        `https://newsapi.org/v2/everything?q=${
          item ? item : "sports"
        }&apiKey=${apiKey}`
      )
      .then((res) => {
        setLoading(false);
        setSearchedItemList(res.data.articles);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ChannelsContext.Provider
      value={{
        channels,
        articles,
        loading,
        searchedItemList,
        getNewsChannelsById,
        getNewsBySearchItem,
        setLoading,
      }}
    >
      <Outlet />
    </ChannelsContext.Provider>
  );
}

export default ChannelsProvider;
