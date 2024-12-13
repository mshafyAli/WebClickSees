




// this code is fine but not provide desired output
// import { useState } from "react";
// import axios from "axios";

// function App() {
//   const [domain, setDomain] = useState("");
//   const [trackingData, setTrackingData] = useState(null);

//   const fetchTrackingData = async () => {
//     try {
//       const response = await axios.get("https://webclicksees.onrender.com/api/tracking-data");
//       setTrackingData(response.data);
//     } catch (error) {
//       console.error("Error fetching tracking data:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Tracking Data Viewer</h1>
//       <input
//         type="text"
//         value={domain}
//         onChange={(e) => setDomain(e.target.value)}
//         placeholder="Enter domain"
//         className="border p-2 w-full mb-4"
//       />
//       <button onClick={fetchTrackingData} className="bg-blue-500 text-white px-4 py-2 mb-4">
//         Fetch Tracking Data
//       </button>
//       {trackingData && (
//         <div className="mt-6">
//           <h2 className="text-xl font-bold">Collected Tracking Data</h2>
//           {trackingData.map((data, index) => (
//             <div key={index} className="border p-4 mb-2">
//               <p><strong>Domain:</strong> {data.domain}</p>
//               <p><strong>IP:</strong> {data.ip}</p>
//               <p><strong>Country:</strong> {data.country}</p>
//               <p><strong>VPN:</strong> {data.isVpn ? "Yes" : "No"}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import { useState } from "react";
import axios from "axios";

function App() {
  const [domain, setDomain] = useState("");
  const [data, setData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.post("https://webclicksees.onrender.com/api/tracking", {
        domain,
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
        </div>
      )}
    </div>
  );
}

export default App;
