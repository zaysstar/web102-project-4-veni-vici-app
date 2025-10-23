import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // --- ALL STATE GOES INSIDE THE App() FUNCTION ---
  const [currentItem, setCurrentItem] = useState(null);
  const [banList, setBanList] = useState({
    names: [],
    origins: []
  });
  const [apiCache, setApiCache] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]); // <-- MOVED INSIDE

  const getNewItem = async () => {
    setIsLoading(true);

    // 1. Try to find a valid item in our existing cache
    const validCachedItem = apiCache.find(
      (item) =>
        !banList.origins.includes(item.breeds[0]?.origin) &&
        !banList.names.includes(item.breeds[0]?.name)
    );

    if (validCachedItem) {
      setCurrentItem(validCachedItem);
      setHistoryList((prevHistory) => [validCachedItem, ...prevHistory]);
      setApiCache((prevCache) =>
        prevCache.filter((item) => item.id !== validCachedItem.id)
      );
      setIsLoading(false);
      return;
    }

    // 2. If no valid item was in the cache, fetch new data
    try {
      // --- THIS IS THE NEW URL AND KEY ---
      // 🔑 REMEMBER to get your own key from thecatapi.com
      const response = await fetch(
        'https://api.thecatapi.com/v1/images/search?limit=20&has_breeds=1',
        { headers: { 'x-api-key': 'live_YOUR_KEY_GOES_HERE' } }
      );
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      // Filter for items that have breed info to ban
      const validItems = data.filter((item) => item.breeds && item.breeds.length > 0);

      const firstValidNewItem = validItems.find(
        (item) =>
          !banList.origins.includes(item.breeds[0]?.origin) &&
          !banList.names.includes(item.breeds[0]?.name)
      );

      if (firstValidNewItem) {
        setCurrentItem(firstValidNewItem);
        setHistoryList((prevHistory) => [firstValidNewItem, ...prevHistory]);
        setApiCache(
          validItems.filter((item) => item.id !== firstValidNewItem.id)
        );
      } else {
        setCurrentItem({
          title: 'No valid cats found! Try clearing your ban list.',
          url: 'https://via.placeholder.com/600x400?text=No+Items+Found',
          breeds: [{ name: 'N/A', origin: 'N/A', temperament: 'N/A' }],
        });
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setCurrentItem({
        title: 'Error fetching data',
        url: 'https://via.placeholder.com/600x400?text=API+Error',
        breeds: [{ name: 'N/A', origin: 'N/A', temperament: 'N/A' }],
      });
    }

    setIsLoading(false);
  };

  // Use useEffect to load the first item on component mount
  useEffect(() => {
    getNewItem(); // No argument needed
  }, []); // Empty array means "run only once on mount"

  const handleBanClick = (value, type) => {
    // type will be 'names' or 'origins'
    if (!value || value === 'N/A') return;

    setBanList((prevBanList) => {
      const isBanned = prevBanList[type].includes(value);
      const newBanList = { ...prevBanList };

      if (isBanned) {
        newBanList[type] = newBanList[type].filter((item) => item !== value);
      } else {
        newBanList[type] = [...newBanList[type], value];
      }
      return newBanList;
    });

    // Check if the banned item is currently displayed
    if (currentItem && currentItem.breeds && currentItem.breeds[0]) {
      if (
        currentItem.breeds[0].name === value ||
        currentItem.breeds[0].origin === value
      ) {
        getNewItem();
      }
    }
  };

  return (
    <div className="app-container">
      <div className="discover-section">
        <button onClick={getNewItem} disabled={isLoading}>
          {isLoading ? 'Discovering...' : 'Discover New!'}
        </button>
        
        {currentItem && ( // <--- FIXED!
          <div className="item-display">
            {/* Check if breeds exist before trying to access them */}
            <h2>{currentItem.breeds ? currentItem.breeds[0]?.name : currentItem.title}</h2>

            <img src={currentItem.url} alt={currentItem.title} />

            {/* Only show these details if we have breed info */}
            {currentItem.breeds && (
              <>
                <p><strong>Temperament:</strong> {currentItem.breeds[0]?.temperament}</p>

                <p
                  className="clickable-attribute"
                  onClick={() => handleBanClick(currentItem.breeds[0]?.name, 'names')}
                >
                  <strong>Breed:</strong> {currentItem.breeds[0]?.name || 'N/A'} (Click to ban)
                </p>

                <p
                  className="clickable-attribute"
                  onClick={() => handleBanClick(currentItem.breeds[0]?.origin, 'origins')}
                >
                  <strong>Origin:</strong> {currentItem.breeds[0]?.origin || 'N/A'} (Click to ban)
                </p>
              </>
            )}
          </div>
        )} {/* <--- FIXED! */}
      </div>

      {/* --- ADD THE NEW HISTORY SECTION JSX --- */}
      <div className="history-section">
        <h3>History</h3>
        <p>(Newest first)</p>
        <div className="history-list-container">
          {historyList.length === 0 ? (
            <p>No history yet.</p>
          ) : (
            // .map() over the historyList state
            historyList.map(item => (
        <div key={item.url} className="history-item">
          <img src={item.url} alt={item.breeds ? item.breeds[0]?.name : item.title} />
          <p>{item.breeds ? item.breeds[0]?.name : item.title}</p>
        </div>
      ))
          )}
        </div>
      </div>
      
    </div>
  );
}

export default App;