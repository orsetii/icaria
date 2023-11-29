import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../../apiConfig';

interface Content {
  0: string; // Index signature to match the Rust definition
}

interface Doc {
  id: string;
  name: string;
  content: Content;
}

interface DocumentSearchProps {
  className?: string; // Add the className prop
}

const DocumentSearch: React.FC<DocumentSearchProps> = ({ className }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Doc[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/docs/search/title/${searchText}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error searching documents:', error);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="text"
          className="w-full px-4 py-2 rounded text-gray bg-gray focus:outline-none focus:ring focus:border-blue-300 mr-2"
          placeholder="Search documents..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ color: '#333', backgroundColor: '#f2f2f2' }}
        />
        <button
          className="h-full py-2 px-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      {searchResults.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Search Results:</h2>
          <ul className="list-disc pl-6 mt-2">
            {searchResults.map((result) => (
              <li key={result.id}>
                <h3 className="text-lg font-semibold p-2">{result.name}</h3>
                <p>{result.content[0]}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentSearch;
