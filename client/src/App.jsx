import { useState, useEffect } from 'react';
import Map from './components/Map';
import MoodSelector from './components/MoodSelector';

// Function to handle API calls
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:5000/api');

function App() {
  const [districtMoods, setDistrictMoods] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMoods = async () => {
    try {
      setLoading(true);
      console.log(`Fetching moods from: ${API_URL}/moods`);
      const response = await fetch(`${API_URL}/moods`);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Failed to fetch moods: ${response.status} ${response.statusText} - ${text}`);
      }
      const data = await response.json();
      setDistrictMoods(data);
    } catch (error) {
      console.error("Error fetching moods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
    const interval = setInterval(fetchMoods, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectMood = async (mood) => {
    if (!selectedDistrict) return;

    try {
      console.log(`Submitting mood to: ${API_URL}/mood`);
      const response = await fetch(`${API_URL}/mood`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ district: selectedDistrict, mood }),
      });

      if (response.ok) {
        await fetchMoods();
        alert(`Recorded ${mood} for ${selectedDistrict}!`);
        setSelectedDistrict(null);
      } else {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        let errorMessage = 'Failed to record mood.';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage += ` ${errorJson.error || ''}`;
        } catch (e) {
          errorMessage += ` Status: ${response.status}`;
        }
        alert(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting mood:", error);
      alert('Failed to record mood. Please try again.'); // Keep user preferred message
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2 drop-shadow-sm">
          Kerala Mood Map
        </h1>
        <p className="text-gray-600 text-lg">See how Kerala is feeling today!</p>
      </header>

      <main className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start justify-center">
        <div className="flex-1 w-full md:max-w-md sticky top-8">
          <Map
            districtMoods={districtMoods}
            onSelectDistrict={setSelectedDistrict}
            selectedDistrict={selectedDistrict}
          />
        </div>

        <div className="flex-1 w-full md:max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Mood Dashboard</h2>

            <MoodSelector
              selectedDistrict={selectedDistrict}
              onSelectMood={handleSelectMood}
            />

            {!selectedDistrict && (
              <div className="mt-8 text-center text-gray-500 italic p-8 border-2 border-dashed border-gray-300 rounded-xl">
                Select a district on the map to tell us how you feel!
              </div>
            )}
          </div>

          {/* Legend or Stats could go here */}
          <div className="mt-6 bg-white/60 p-4 rounded-xl text-sm text-gray-600">
            <p><strong>Note:</strong> The map updates in real-time based on user reports. The color represents the dominant mood in each district.</p>
          </div>
        </div>
      </main>

      <footer className="text-center mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Kerala Mood Map Project
      </footer>
    </div>
  );
}

export default App;
