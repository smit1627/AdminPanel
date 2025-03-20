import React, { useState, useEffect } from 'react';

const TopPerformingCenters = () => {
  // Sample data for the first table
  const [centers, setCenters] = useState([
    { id: 1, name: "City Central Hub", verifiedEntries: 1243 },
    { id: 2, name: "Westside Excellence Center", verifiedEntries: 1102 },
    { id: 3, name: "North District Office", verifiedEntries: 987 },
    { id: 4, name: "East End Facility", verifiedEntries: 876 },
    { id: 5, name: "South Point Center", verifiedEntries: 752 }
  ]);

  // Sample data for the second table
  const [secondTableData, setSecondTableData] = useState([
    { id: 1, name: "Regional Office Alpha", verifiedEntries: 934 },
    { id: 2, name: "Downtown Branch", verifiedEntries: 889 },
    { id: 3, name: "Riverside Location", verifiedEntries: 842 },
    { id: 4, name: "Hillside Center", verifiedEntries: 781 },
    { id: 5, name: "Valley Point Office", verifiedEntries: 705 }
  ]);

  // Sort centers by verified entries (highest first)
  useEffect(() => {
    const sortedCenters = [...centers].sort((a, b) => 
      b.verifiedEntries - a.verifiedEntries
    );
    setCenters(sortedCenters);
    
    const sortedSecondTable = [...secondTableData].sort((a, b) => 
      b.verifiedEntries - a.verifiedEntries
    );
    setSecondTableData(sortedSecondTable);
  }, []);

  // Table component to avoid repetition
  const TableComponent = ({ data, title }) => (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <div className="mb-6 p-4">
        <h2 className="text-xl font-bold text-center text-gray-800">
          {title}
        </h2>
        <div className="w-16 h-1 mx-auto mt-2 bg-blue-500 rounded"></div>
      </div>

      <div className="overflow-hidden rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-3 px-4 text-left font-semibold">Center Name</th>
              <th className="py-3 px-4 text-right font-semibold">Verified Entries</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={item.id}
                className={`
                  ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'} 
                  hover:bg-blue-100 transition-colors duration-150 ease-in-out
                `}
              >
                <td className="py-3 px-4 text-left">
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex-shrink-0 mr-3 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-blue-600 text-xs">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-800 text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end">
                    <span className="font-medium text-gray-800 text-sm">{item.verifiedEntries.toLocaleString()}</span>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      index === 0 ? 'bg-blue-100 text-blue-800' : 
                      index === 1 ? 'bg-green-100 text-green-800' :
                      index === 2 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Center Performance Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <TableComponent data={centers} title="Top Performing Centers" />
        </div>
        <div className="w-full md:w-1/2">
          <TableComponent data={secondTableData} title="Regional Performance" />
        </div>
      </div>
    </div>
  );
};

export default TopPerformingCenters;