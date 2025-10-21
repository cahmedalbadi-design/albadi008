
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SHEET_CSV_URL } from './constants';
import { fetchSheetData } from './services/googleSheetService';
import { SheetRow } from './types';
import SearchBar from './components/SearchBar';
import ResultsTable from './components/ResultsTable';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [allData, setAllData] = useState<SheetRow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const tableHeaders = useMemo(() => {
    if (allData.length > 0) {
      // Preserve original column order
      return Object.keys(allData[0]);
    }
    return [];
  }, [allData]);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchSheetData(SHEET_CSV_URL);
      setAllData(data);
    } catch (err) {
      setError('لا يمكن تحميل البيانات من جوجل شيت. يرجى التحقق من الرابط أو اتصالك بالإنترنت.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return allData;
    }
    const lowercasedQuery = searchQuery.toLowerCase().trim();
    if (lowercasedQuery === '') {
        return allData;
    }
    return allData.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [allData, searchQuery]);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            البحث في بيانات جوجل شيت
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            أدخل أي قيمة للبحث في الجدول بشكل فوري
          </p>
        </header>
        
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="mt-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <ResultsTable data={filteredData} headers={tableHeaders} />
          )}
        </div>
        <footer className="text-center mt-12 text-sm text-gray-500">
          <p>تطبيق ويب للبحث في جداول بيانات جوجل.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
