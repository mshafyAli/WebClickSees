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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const response = await fetch(
          "https://webclicksees.onrender.com/api/tracking-records"
        );
        const data = await response.json();
        setRecords(
          data.filter((record) => record.domain === "academians.com.au")
        );
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
    try {
      if (confirmDelete) {
        const response = await fetch(
          `https://webclicksees.onrender.com/api/tracking-records/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setRecords(records.filter((record) => record._id !== id));
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
            .map((record) => {
              // Format the date in 'MM/DD/YYYY' format (or use a format that suits you)
              const formattedDate = record.date
                ? new Date(record.date).toLocaleDateString()
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
                  <TableCell>{formattedDate}</TableCell>

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
