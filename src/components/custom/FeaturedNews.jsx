import React, { useContext } from "react";
import { Clock } from "lucide-react";
import { ChannelsContext } from "@/context/ChannelsContext";

function FeaturedNews(props) {
  let { loading } = useContext(ChannelsContext);
  const { articles } = props;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <article className="grid md:grid-cols-2 lg:grid-cols-3 items-stretch gap-10 mt-5">
      {articles?.map((article, index) => {
        const time = article.publishedAt.substring(11, 16);

        return (
          <a
            href={article.url}
            target="_blank"
            key={index}
            className=" gap-4 cursor-pointer group"
          >
           {article.content == "[Removed]" || article.urlToImage == null ? <img src="https://static.vecteezy.com/system/resources/previews/012/942/784/original/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg" alt={article.title} className="rounded-2xl w-full h-96" /> : <img src={article.urlToImage} alt={article.title} className="rounded-2xl w-full h-96 object-fit" />}

            <figcaption className="mt-3 flex justify-between items-start flex-col md:flex-row">
              <h2 className="font-bold group-hover:text-primary w-[300px] line-clamp-2">
                {article.title}
              </h2>
              <article className="flex md:flex-col items-center md:items-end justify-between w-full">
                <h2 className="text-primary bg-purple-100 p-2 rounded-md text-xs font-bold ">
                  {article.source.name}
                </h2>

                <h2 className="flex items-center gap-1 text-xs text-gray-800">
                  <Clock className="w-3 text-gray-700" />

                  {time}
                </h2>
              </article>
            </figcaption>
          </a>
        );
      })}
    </article>
  );
}

export default FeaturedNews;
