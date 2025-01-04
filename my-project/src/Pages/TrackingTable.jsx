import React, { useEffect, useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/Components/ui/table";

const TrackingTable = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch("https://webclicksees.onrender.com/api/tracking-records");
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

  if (loading) {
    return <p>Loading tracking data...</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Domain</TableCell>
          <TableCell>GCLID</TableCell>
          <TableCell>IP</TableCell>
          <TableCell>Country</TableCell>
          <TableCell>VPN</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {records.map((record) => (
          <TableRow key={record._id}>
            <TableCell>{record._id}</TableCell>
            <TableCell>{record.domain}</TableCell>
            <TableCell>{record.gclid || "N/A"}</TableCell>
            <TableCell>{record.ip}</TableCell>
            <TableCell>{record.country}</TableCell>
            <TableCell>{record.isVpn ? "Yes" : "No"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TrackingTable;
