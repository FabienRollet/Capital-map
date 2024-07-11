import { Link, useLocation } from 'react-router-dom';
import Data from "./components/Data";

function App() {
  const url = useLocation();
  const btn = "bg-white rounded-full bg-[radial-gradient(circle_at_bottom_center,#ffc837_15px,#ff8008)] shadow-[0_10px_10px_-5px_rgba(0,0,0,0.2)] h-24 w-24 flex justify-center items-center"

  return (
    <>
     <header className="flex mr-12 my-8 justify-end">
      {url.pathname === '/screen2' ? (
        <Link to="/" className={btn}>
          Écran 1 →
        </Link>
      ) : (
        <Link to="/screen2" className={btn}>
          Écran 2 →
        </Link>
      )}
    </header>
      <Data />
    </>
  )
}

export default App
