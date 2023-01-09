import LayoutDefault from "./Layout/LayoutDefault";
import "tippy.js/dist/tippy.css";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'
function App() {
  return(
    <>
       <LayoutDefault />
    <ToastContainer />
    </>
  );
}

export default App;
