import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig';
import { Document } from './Common';



const RecentlyChanged: React.FC = () => {
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchRecentDocuments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/docs/recent/10`);
        const data = await response.json();
        setRecentDocuments(data);
      } catch (error) {
        console.error('Error fetching recent documents:', error);
      }
    };

    fetchRecentDocuments();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Recently Changed Documents</h2>
      <ul className="space-y-4">
        {recentDocuments.map((document) => (
          <li key={document.id} className="flex flex-col">
            <Link
              to={`/docs/view?title=${document.title}`}
              className="text-blue-500 hover:underline"
            >
              {document.title}
            </Link>
            <p className="text-gray-600">Last Updated: {document.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentlyChanged;
