import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
  TableCaption,
  TableFooter,
} from "@/Components/ui/table";

const TrackingTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(
          "https://webclicksees.onrender.com/api/tracking-records"
        );
        const data = await response.json();
        setRecords(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tracking records:", error);
        setLoading(false);
      }
    };

    fetchTrackingData();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    try{
        if(confirmDelete){
          const response = await fetch(`https://webclicksees.onrender.com/api/tracking-records/${id}`, {
            method: "DELETE",
          });
          if(response.ok){
            setRecords(records.filter((record) => record._id !== id));
          }
        }
    }catch(error){
      console.error("Error deleting tracking record:", error);
    }
  }

  if (loading) {
    return <p>Loading tracking data...</p>;
  }

  return (
    

    <div className="mt-12">
      <Table className="max-w-4xl mx-auto">
        <TableCaption>A list of your recent Tracking.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Domain</TableHead>
            <TableHead>Gclid</TableHead>
            <TableHead>Ip</TableHead>
            <TableHead className="text-left">Country</TableHead>
            <TableHead className="text-left">VPN</TableHead>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Delete</TableHead>

          </TableRow>
        </TableHeader>
        <TableBody>
          {records
            .slice()
            .reverse()
            .map((record) => (
              <TableRow key={record._id}>
                <TableCell className="font-medium">{record.domain}</TableCell>
                <TableCell>{record.gclid || "N/A"}</TableCell>
                <TableCell>{record.ip}</TableCell>
                <TableCell className="text-left">{record.country}</TableCell>
                <TableCell className="text-left">
                  {record.isVpn ? "Yes" : "No"}
                </TableCell>
                <TableCell>{record.date}</TableCell>

                <TableCell className="text-left">
                  <button
                    className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TrackingTable;



//     <Table className="w-full">
    //   <TableHead className="bg-gray-100">
    //     <TableRow>
    //       {/* <TableCell className="px-12 py-2 text-left">ID</TableCell> */}
    //       <TableCell className="px-6 py-2 text-left">Domain</TableCell>
    //       <TableCell className="px-12 py-2 text-left">GCLID</TableCell>
    //       <TableCell className="px-12 py-2 text-left">IP</TableCell>
    //       <TableCell className="px-12 py-2 text-left">Country</TableCell>
    //       <TableCell className="px-12 py-2 text-left">VPN</TableCell>
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {records.map((record) => (
    //       <TableRow key={record._id} className="hover:bg-gray-50">
    //         {/* <TableCell className="px-4 py-2">{record._id}</TableCell> */}
    //         <TableCell className="px-4 py-2">{record.domain}</TableCell>
    //         <TableCell className="px-4 py-2">{record.gclid || "N/A"}</TableCell>
    //         <TableCell className="px-4 py-2">{record.ip}</TableCell>
    //         <TableCell className="px-4 py-2">{record.country}</TableCell>
    //         <TableCell className="px-4 py-2">{record.isVpn ? "Yes" : "No"}</TableCell>
    //       </TableRow>
    //     ))}
    //   </TableBody>
    // </Table>