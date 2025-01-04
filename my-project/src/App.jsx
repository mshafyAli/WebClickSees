




// this code is fine but not provide desired output

import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import TrackingTable from './Pages/TrackingTable';
function App() {

  

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Tracking Data Viewer</h1>
    //   <input
    //     type="text"
    //     value={domain}
    //     onChange={(e) => setDomain(e.target.value)}
    //     placeholder="Enter domain"
    //     className="border p-2 w-full mb-4"
    //   />
    //   <button onClick={fetchTrackingData} className="bg-blue-500 text-white px-4 py-2 mb-4">
    //     Fetch Tracking Data
    //   </button>
    //   {trackingData && (
    //     <div className="mt-6">
    //       <h2 className="text-xl font-bold">Collected Tracking Data</h2>
    //       {trackingData.map((data, index) => (
    //         <div key={index} className="border p-4 mb-2">
    //           <p><strong>Domain:</strong> {data.domain}</p>
    //           <p><strong>IP:</strong> {data.ip}</p>
    //           <p><strong>Country:</strong> {data.country}</p>
    //           <p><strong>VPN:</strong> {data.isVpn ? "Yes" : "No"}</p>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
    <>
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/records" element={<TrackingTable />} />
      {/* <Route path="/contact" element={<Contact />} /> */}
    </Routes>
    </>
  );
}

export default App;





