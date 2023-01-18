import LayoutDefault from "./Layout/LayoutDefault";
import "tippy.js/dist/tippy.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
import { useEffect,  useState } from "react";
import Sorry from "./components/HandleDetect/Sorry";
import Welcome from "./components/Welcome/Welcome";
function App() {
  const [size,setSize] =useState(700)
  useEffect(() => {
    // console.log(window.innerWidth)
    window.addEventListener('load',() => {
        setSize(window.innerWidth)
    })
    
    return () => {
      
      window.removeEventListener('load',() =>{
      setSize(0)
    })} 
  },[])
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
