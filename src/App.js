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
  // useEffect(() => {
  //   // console.log(window.innerWidth)
  //   window.addEventListener('load',() => {
  //       setSize(window.innerWidth)
  //   })
    
  //   return () => {
      
  //     window.removeEventListener('load',() =>{
  //     setSize(0)
  //   })} 
  // },[size])
  // const [isLoading,setIsLoading] = useState(false)
  // useEffect(() => {
  //    setIsLoading(true)
  //    const res = setTimeout(() =>{
  //      setIsLoading(false)
  //    } ,3000)
 
  //    return () => {
  //      clearTimeout(res)
  //    }
  //  },[])
 
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
