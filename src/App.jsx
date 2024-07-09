import { Link, useLocation } from 'react-router-dom';
import Data from "./components/Data";

function App() {
  const url = useLocation();

  return (
    <>
     <header className="flex mr-12 my-8 justify-end">
      {url.pathname === '/screen2' ? (
        <Link to="/" className="btn">
          Écran 1 →
        </Link>
      ) : (
        <Link to="/screen2" className="btn">
          Écran 2 →
        </Link>
      )}
    </header>
      <Data />
    </>
  )
}

export default App
