import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/custom/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ChannelsProvider from "./context/ChannelsContext";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <Router>
       <ScrollToTop />
      <Routes>
        <Route element={<ChannelsProvider />}>
          <Route exact element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
