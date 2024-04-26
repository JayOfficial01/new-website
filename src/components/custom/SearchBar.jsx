import React, { useContext, useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";

import { Button } from "../ui/button";
import { ChannelsContext } from "@/context/ChannelsContext";

function SearchBar(props) {
  const {placeholder, getValue = ()=> {}} = props
  let { loading } = useContext(ChannelsContext);

  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getValue(search);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <article className="w-full bg-white rounded-full flex items-center px-1.5">
      
        <input
          type="text"
          placeholder={placeholder}
          className="bg-none outline-none p-2.5 flex-1 rounded-full"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <Button className="flex items-center justify-center rounded-full w-10 h-10 p-2.5">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="w-[50px] h-[50px]" />
        )}
        </Button>
      </article>
    </form>
  );
}

export default SearchBar;
