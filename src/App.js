import LayoutDefault from "./Layout/LayoutDefault";
import "tippy.js/dist/tippy.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { useEffect, useLayoutEffect, useState } from "react";
import Sorry from "./components/HandleDetect/Sorry";
function App() {
  const [size,setsize] =useState(700)
  useEffect(() => {
    // console.log(window.innerWidth)
    window.addEventListener('resize',() => {
        setsize(window.innerWidth)
    })
    return window.removeEventListener('resize',() =>{
      setsize(0)
    })
  },[])
  
  return(
    size < 700 ? (
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
