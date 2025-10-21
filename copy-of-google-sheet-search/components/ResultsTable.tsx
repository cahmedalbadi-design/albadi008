
import React from 'react';
import { SheetRow } from '../types';

interface ResultsTableProps {
  data: SheetRow[];
  headers: string[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ data, headers }) => {
  if (data.length === 0) {
    return <p className="text-center text-gray-500 mt-8 text-lg">لم يتم العثور على نتائج.</p>;
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {headers.map(header => (
                    <th key={header} scope="col" className="py-3.5 px-3 text-right text-sm font-semibold text-gray-900">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                    {headers.map(header => (
                      <td key={`${rowIndex}-${header}`} className="whitespace-nowrap py-4 px-3 text-sm text-gray-700">
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
