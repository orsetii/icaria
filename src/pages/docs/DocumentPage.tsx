import React, { useEffect, useState } from 'react';
import API_BASE_URL from '../../apiConfig';
import { Document } from '../../components/docs/Common';

const DocumentPage: React.FC = () => {
  const [document, setDocument] = useState<Document | null>(null);
  const queryParameters = new URLSearchParams(window.location.search)
  const title = queryParameters.get("title")


  function formatDate(secs: string) {
    var m = new Date(0); // The 0 there is the key, which sets the date to the epoch
    m.setUTCSeconds(parseInt(secs));
    return m.getUTCFullYear() + "/" +
    ("0" + (m.getUTCMonth()+1)).slice(-2) + "/" +
    ("0" + m.getUTCDate()).slice(-2) + " " +
    ("0" + m.getUTCHours()).slice(-2) + ":" +
    ("0" + m.getUTCMinutes()).slice(-2) + ":" +
    ("0" + m.getUTCSeconds()).slice(-2);
  }

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/docs/title/${title}`);
        const data = await response.json();
        setDocument(data);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocument();
  }, [title]);

  if (!document) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{document.title}</h2>
      <p className="text-gray-600 text-sm mb-2">{document.id}</p>
      <p className="text-gray-600 mb-2">{formatDate(document.modified_at.secs_since_epoch)}</p>
      <div className="prose max-w-none">{document.content}</div>
    </div>
  );
};

export default DocumentPage;
