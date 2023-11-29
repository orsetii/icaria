import React from 'react';
import DocumentSearch from '../../components/docs/DocumentSearch';
import RecentlyChanged from '../../components/docs/recentlyChanged';
import MarkdownViewer from '../../components/docs/MarkdownViewer';


const DocumentsHomePage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Documents Title */}
      <h1 className="text-3xl font-semibold text-center pt-8">Documents</h1>
      
      {/* Search Bar */}
      <div className="flex items-center justify-center h-1/3 text-white">
        <DocumentSearch className="w-1/2" /> {/* Expand to at least 50% */}
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center h-2/3"> {/* Center the content */}
        {/* Recently Changed Documents */}
        <div className="w-2/3 p-4 text-center">
          <RecentlyChanged />
        </div>

        <MarkdownViewer />
        
        {/* Blank Space */}
        <div className="w-1/3 bg-gray-100"></div>
      </div>
    </div>
  );
};

export default DocumentsHomePage;
