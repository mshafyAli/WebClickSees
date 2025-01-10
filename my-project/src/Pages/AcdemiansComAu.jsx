// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableHeader,
//   TableCaption,
// } from "@/Components/ui/table";

// const TrackingTable = () => {
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTrackingData = async () => {
//       try {
//         const response = await fetch(
//           "https://webclicksees.onrender.com/api/tracking-records"
//         );
//         const data = await response.json();
//         setRecords(
//           data.filter((record) => record.domain === "academians.com.au")
//         );
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching tracking records:", error);
//         setLoading(false);
//       }
//     };

//     fetchTrackingData();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete?");
//     try {
//       if (confirmDelete) {
//         const response = await fetch(
//           `https://webclicksees.onrender.com/api/tracking-records/${id}`,
//           {
//             method: "DELETE",
//           }
//         );
//         if (response.ok) {
//           setRecords(records.filter((record) => record._id !== id));
//         }
//       }
//     } catch (error) {
//       console.error("Error deleting tracking record:", error);
//     }
//   };

//   if (loading) {
//     return <p>Loading tracking data...</p>;
//   }

//   return (
//     <div className="mt-12">
      
//       <Table className="max-w-4xl mx-auto">
//   <TableCaption>A list of your recent Tracking.</TableCaption>
//   <TableHeader>
//     <TableRow>
//       <TableHead className="w-[100px]">Domain</TableHead>
//       <TableHead>Gclid</TableHead>
//       <TableHead>Ip</TableHead>
//       <TableHead className="text-left">Country</TableHead>
//       <TableHead className="text-left">VPN</TableHead>
//       <TableHead className="text-left">Date & Time</TableHead>
//       <TableHead className="text-left">Delete</TableHead>
//     </TableRow>
//   </TableHeader>

//   <TableBody>
//     {records
//       .slice()
//       .reverse()
//       .map((record) => {
//         // Format the date and time using 'toLocaleString'
//         const formattedDateTime = record.date
//           ? new Date(record.date).toLocaleString() // Includes both date and time
//           : "N/A";

//         return (
//           <TableRow key={record._id}>
//             <TableCell className="font-medium">{record.domain}</TableCell>
//             <TableCell>{record.gclid || "N/A"}</TableCell>
//             <TableCell>{record.ip}</TableCell>
//             <TableCell className="text-left">{record.country}</TableCell>
//             <TableCell className="text-left">
//               {record.isVpn ? "Yes" : "No"}
//             </TableCell>
//             <TableCell>{formattedDateTime}</TableCell>

//             <TableCell className="text-left">
//               <button
//                 className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
//                 onClick={() => handleDelete(record._id)}
//               >
//                 Delete
//               </button>
//             </TableCell>
//           </TableRow>
//         );
//       })}
//   </TableBody>
// </Table>

//     </div>
//   );
// };

// export default TrackingTable;



import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableCaption,
} from "@/Components/ui/table";

const TrackingTable = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(
          "https://webclicksees.onrender.com/api/tracking-records"
        );
        const data = await response.json();
        const domainRecords = data.filter(
          (record) => record.domain === "academians.com.au"
        );
        setRecords(domainRecords);
        setFilteredRecords(domainRecords);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracking records:", error);
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, []);

  const handleFilter = () => {
    if (!startDate && !endDate) {
      setFilteredRecords(records);
      return;
    }

    const filtered = records.filter((record) => {
      const recordDate = new Date(record.date).toISOString().split("T")[0];
      const start = startDate ? new Date(startDate).toISOString().split("T")[0] : null;
      const end = endDate ? new Date(endDate).toISOString().split("T")[0] : null;

      if (start && end) {
        return recordDate >= start && recordDate <= end;
      } else if (start) {
        return recordDate >= start;
      } else if (end) {
        return recordDate <= end;
      }
      return true;
    });

    setFilteredRecords(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    try {
      if (confirmDelete) {
        const response = await fetch(
          `https://webclicksees.onrender.com/api/tracking-records/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const updatedRecords = records.filter((record) => record._id !== id);
          setRecords(updatedRecords);
          setFilteredRecords(updatedRecords);
        }
      }
    } catch (error) {
      console.error("Error deleting tracking record:", error);
    }
  };

  if (loading) {
    return <p>Loading tracking data...</p>;
  }

  return (
    <div className="mt-12">
      {/* Filter Controls */}
      <div className="md:max-w-4xl mx-auto mb-4">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-4 ">
          <div>
            <label className=" mb-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full  px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="mb-4">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className=" w-full px-3 py-2 border rounded"
            />
          </div>
          <button
          onClick={handleFilter}
          className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Apply Filter
        </button>
        </div>

       
      </div>

      <Table className="max-w-4xl mx-auto">
        <TableCaption>A list of your recent Tracking.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Domain</TableHead>
            <TableHead>Gclid</TableHead>
            <TableHead>Ip</TableHead>
            <TableHead className="text-left">Country</TableHead>
            <TableHead className="text-left">VPN</TableHead>
            <TableHead className="text-left">Date & Time</TableHead>
            <TableHead className="text-left">Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredRecords
            .slice()
            .reverse()
            .map((record) => {
              const formattedDateTime = record.date
                ? new Date(record.date).toLocaleString()
                : "N/A";

              return (
                <TableRow key={record._id}>
                  <TableCell className="font-medium">{record.domain}</TableCell>
                  <TableCell>{record.gclid || "N/A"}</TableCell>
                  <TableCell>{record.ip}</TableCell>
                  <TableCell className="text-left">{record.country}</TableCell>
                  <TableCell className="text-left">
                    {record.isVpn ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>{formattedDateTime}</TableCell>
                  <TableCell className="text-left">
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() => handleDelete(record._id)}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackingTable;