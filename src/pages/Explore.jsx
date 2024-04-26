import FeaturedNews from "@/components/custom/FeaturedNews";
import SearchBar from "@/components/custom/SearchBar";
import { ChannelsContext } from "@/context/ChannelsContext";
import  { useContext,useState,useEffect } from "react";

function Explore() {
  const { searchedItemList, getNewsBySearchItem,setLoading } = useContext(ChannelsContext);
  const [searchValue, setSearchValue] = useState("")

useEffect(() => {
  searchValue && getNewsBySearchItem(searchValue)
  searchValue && setLoading(true)
}, [searchValue])


  return (
    <article className="p-4 bg-slate-100">
      <SearchBar placeholder="Search for anything..." getValue={setSearchValue} />

      <FeaturedNews articles={searchedItemList} />
    </article>
  );
}

export default Explore;
