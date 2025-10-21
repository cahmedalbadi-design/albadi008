import { SheetRow } from '../types';

// A more robust CSV parser that handles commas within quoted fields.
const parseCSV = (csvText: string): SheetRow[] => {
  const lines = csvText.trim().split(/\r\n|\n/).filter(line => line.trim() !== '');
  if (lines.length < 2) {
    return []; // No data rows
  }

  // This regex splits a CSV row by commas, but ignores commas inside double quotes.
  const csvRowRegex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

  const headers = lines[0].split(csvRowRegex).map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(csvRowRegex);
    // Only process rows that have the same number of columns as headers
    if (values.length === headers.length) {
      const rowObject: { [key: string]: string } = {};
      headers.forEach((header, index) => {
        if (header) { // Ensure header is not an empty string
          const value = values[index] || '';
          // Trim whitespace and remove surrounding quotes from each value, and handle escaped quotes ("")
          rowObject[header] = value.trim().replace(/^"|"$/g, '').replace(/""/g, '"');
        }
      });
      data.push(rowObject as SheetRow);
    }
  }

  return data;
};


export const fetchSheetData = async (url: string): Promise<SheetRow[]> => {
  try {
    // Append a timestamp to prevent aggressive caching
    const urlWithNoCache = `${url}&t=${new Date().getTime()}`;
    const response = await fetch(urlWithNoCache);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();
    return parseCSV(csvText);
  } catch (error) {
    console.error("Failed to fetch or parse sheet data:", error);
    throw error; // Re-throw to be caught by the component
  }
};
