import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    // to create async function
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if(!res.ok) throw new ERROR('Failed to fetch data.');
        const data = await res.json();
        console.log(data);
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    // to call async function
    fetchCoins();

  }, [limit]);

  

  return ( 
    <div>
      <h1>🚀 Crypto Dash</h1>
      { loading && <p>Loading...</p> }
      { error && <div className="error">{error}</div> }

      <div className="controls">
        <label htmlFor="limit">Show:</label>
        <select value={limit} id="limit" onChange={(e) => setLimit(Number(e.target.value))}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      {!loading && !error && (
       <main className="grid">
        {coins.map((coin) => (
          <CoinCard coin={coin} key={coin.id} />
        ))}
       </main> 
      )}
    </div>
   );
}
 
export default App;