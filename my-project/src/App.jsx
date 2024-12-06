// App.js (React)
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post("https://webclicksees.onrender.com/api/tracking", {
        domain,
        ip: "127.0.0.1", // Replace with dynamic IP
        gclid: "test-gclid", // Test GCLID
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Track Domain</h1>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain"
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">
        Search
      </button>
      {data && (
        <div className="mt-6">
          <h2 className="text-xl font-bold">Results</h2>
          <p>Domain: {data.domain}</p>
          <p>GCLID: {data.gclid}</p>
          <p>Country: {data.country}</p>
          <p>VPN: {data.isVpn ? "Yes" : "No"}</p>
          <p>Visits: {data.visits}</p>
        </div>
      )}
    </div>
  );
}

export default App;
