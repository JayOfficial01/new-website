import  { useContext } from "react";
import { ChannelsContext } from "@/context/ChannelsContext";
import {  Clock,  } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

const Headlines = (props)=> {
  const {articles} = props

  console.log(articles)

return (
<Carousel>
  <CarouselContent>
   {articles?.map((article,index)=>(
    <CarouselItem className=" md:basis-1/2 lg:basis-1/4 cursor-pointer" key={index}>
      <a href={article.url} target="_blank" className="block h-96 relative">
        <img src={article.urlToImage} alt={article.title} className="h-full object-cover " />

        <h2 className="absolute bottom-0 text-white text-sm p-3 line-clamp-2 h-14 bg-black">{article.title}</h2>
      </a>
    </CarouselItem>
   ))}
    
  </CarouselContent>
</Carousel>
  )
}


function Home() {
  let { articles } = useContext(ChannelsContext);

  return (
    <article className="p-4">
       <h1 className="font-bold text-xl mb-4">Featured Headline</h1>
     <Headlines articles={articles} />

      <article className="mt-5">
        <h1 className="font-bold text-xl">Today's Headline</h1>

        <article className="mt-5">
          {articles.map((article, index) =>{
            const time = article.publishedAt.substring(11, 16);
            return (
              <figure key={index} className="mb-10 bg-white p-5 rounded-2xl">
                {article.content == null ? <img src="https://static.vecteezy.com/system/resources/previews/012/942/784/original/broken-image-icon-isolated-on-a-white-background-no-image-symbol-for-web-and-mobile-apps-free-vector.jpg" alt={article.title} className="rounded-2xl w-full h-96" /> : <img src={article.urlToImage} alt={article.title} className="rounded-2xl w-full h-96 object-fit" />}
                <figcaption>
                  <article className="flex   mt-3 items-center justify-between">
                  <h3 className="text-xs bg-purple-100 w-fit py-1.5 px-3 text-primary rounded-full">{article.source.name}</h3>

                  <article className="flex items-center gap-1">
                    <Clock className="w-3" />
                    <h3 className="text-xs text-gray rounded-full">{time}</h3>
                  </article>
                  </article>
                  <h1 className="mt-4 font-bold text-base md:text-xl">{article.title}</h1>
                  <p className="mt-3 text-gray-500">{article.description}</p>

                  <article className="flex items-center justify-between mt-5">
                    <h2 className="text-sm">Author : <span className="font-bold ">{article.author}</span></h2>
                    <a href={article.url} className="text-primary cursor-pointer" target="_blank">Read More</a>
                  </article>
                </figcaption>
              </figure>
            );
          })}
        </article>

      </article>

    </article>
  );
}

export default Home;
