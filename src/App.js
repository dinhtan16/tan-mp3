import LayoutDefault from "./Layout/LayoutDefault";
import "tippy.js/dist/tippy.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { useEffect,  useState } from "react";
import Sorry from "./components/HandleDetect/Sorry";
import Welcome from "./components/Welcome/Welcome";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export  function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
function App() {
  const { height, width } = useWindowDimensions();

  return(
    width < 700 ? (
    <Sorry />
    ) : (
      <>
      <LayoutDefault />
     <ToastContainer />
   </>
    )
  );
}

export default App;
