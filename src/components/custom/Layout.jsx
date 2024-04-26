import {useContext,useState, useEffect} from "react";
import { ArrowRight, Compass, Filter, Flame, Home, Plus, Minus } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import {ChannelsContext} from "../../context/ChannelsContext"
import { ScrollArea } from "@/components/ui/scroll-area"

function Layout() {
  let { channels, getNewsChannelsById } = useContext(ChannelsContext);
  const [following, setFollowing] =useState([]);
  const storedChannels = JSON.parse(localStorage.getItem('channels')) ;
  const [channelList, setChannelList] = useState(storedChannels||[]);
  const location = useLocation();

  useEffect(()=>{
    const channel = [
      {
        category: "general",
        country:"au",
        description: "Australia's most trusted source of local, national and world news. Comprehensive, independent, in-depth analysis, the latest business, sport, weather and more.",
        id: "abc-news-au",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/ABC_News_%282017%29.svg/2560px-ABC_News_%282017%29.svg.png",
        language: "en",
        name: "ABC News (AU)",
        url: "https://www.abc.net.au/news",
      }
    ]

    localStorage.setItem('channels', JSON.stringify(channel));
  },[])

useEffect(()=>{
  channelList && setFollowing(channelList)
  channelList && getNewsChannelsById(channelList.map((channel)=> channel.id))
},[channelList])

channels = channels.filter(channel => !following.some(follow => follow.id === channel.id));
  
  const handleAddChannel = (channel) =>{
    setChannelList([...channelList, channel])
    localStorage.setItem('channels', JSON.stringify(channelList));
  }

  const handleRemoveChannel = (channel) =>{
    setChannelList(following.filter((follow) => follow.id !== channel.id))
    localStorage.setItem('channels', JSON.stringify(channelList));
  }

  const menus = [
    {
      url: "/",
      name: "New Feed",
      icon: <Home />,
    },
    {
      url: "/explore",
      name: "Explore",
      icon: <Compass />,
    },
  ];

  return (
    <article>
      <aside className="hidden lg:block bg-slate-50 p-5 w-72 h-screen fixed">
        <h1 className="text-center font-bold  p-3 rounded-sm text-xl">
          Jay<span className="text-primary">News</span>
        </h1>

    

        <article className="mt-7">
          {menus.map((menu, index) => (
            <NavLink
              to={menu.url}
              className={`flex gap-3 items-center group p-3 mb-3 ${
                location.pathname == menu.url && "bg-purple-100 rounded-lg p-2"
              }`}
              key={index}
            >
              <span
                className={`text-gray-500 group-hover:text-primary ${
                  location.pathname == menu.url && "text-primary font-medium"
                }`}
              >
                {menu.icon}
              </span>
              <h2
                className={`text-gray-500 group-hover:text-primary ${
                  location.pathname == menu.url && "text-primary font-bold"
                }`}
              >
                {menu.name}
              </h2>
            </NavLink>
          ))}
        </article>

        <hr />

        <article className="py-4">
          <h2 className="font-bold">Following</h2>

          <ScrollArea className="mt-5 h-[250px] pr-3">
            {following?.map((channel, index)=>(
                  <figure key={index} className="mb-3 flex items-center gap-2">
                  <picture className="bg-white rounded-full w-12 h-12 p-1.5 flex items-center justify-center">
                  <img src={channel.img} alt={channel.name} className="max-w-full" />
                  </picture>
      
                  <figcaption className="flex-1 flex items-center justify-between">
                    <h3 className="text-sm">{channel.name}</h3>
      
                    {following.length !== 1 && <span className="cursor-pointer" onClick={()=>handleRemoveChannel(channel)}><Minus className="w-2.5" /></span>}
                  </figcaption>
                </figure>
            ))}
          </ScrollArea>
        </article>

        <hr />
        <article className="bg-white mt-5 p-5 flex flex-col items-center rounded-md shadow-sm text-center">
          <span className="bg-orange-200 text-orange-500 p-2 rounded-sm text-lg">
            <Flame />
          </span>

          <h1 className="mt-5 font-bold text-black-500">
            Subscribe to our new plan{" "}
            <span className="text-orange-500 font-bold">$25</span>
          </h1>

          <p className="text-slate-500 text-xs mt-3">
            It is a limited time offer that will expire soon
          </p>

          <Button className="flex items-center gap-4 mt-4 text-sm">
            Subscribe Now
            <span>
              <ArrowRight />
            </span>
          </Button>
        </article>
      </aside>

      <article className="hidden lg:block bg-slate-50 p-5 w-72 h-screen fixed right-0 z-10">
        <h1 className="font-bold">Add Channels</h1>

        <ScrollArea className="mt-5 h-[450px] pr-3">
          {channels?.map((channel, index)=> (
          <figure key={index} className="mb-3 flex items-center gap-2">
            <picture className="bg-white rounded-full w-12 h-12 p-1.5 flex items-center justify-center">
            <img src={channel.img} alt={channel.name} className="max-w-full" />
            </picture>

            <figcaption className="flex-1 flex items-center justify-between">
              <h3 className="text-sm">{channel.name}</h3>

              <span className="cursor-pointer" onClick={()=>handleAddChannel(channel)}><Plus className="w-2.5" /></span>
            </figcaption>
          </figure>
          ))}
        </ScrollArea>
      </article>
       
      <article className="px-5 lg:px-80 xl:px-90 bg-slate-100">
        <Outlet />
      </article>
      
      
    </article>
  );
}

export default Layout;
