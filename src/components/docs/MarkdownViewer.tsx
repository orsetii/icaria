import React, { useState, useEffect, ChangeEvent } from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownFile {
  name: string;
  download_url: string;
}

const repositoryUrl = 'https://api.github.com/repos/orsetii/md/contents';

const MarkdownViewer: React.FC = () => {
  const [markdownFiles, setMarkdownFiles] = useState<MarkdownFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<MarkdownFile | null>(null);
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    // Fetch Repository Contents
    fetch(repositoryUrl)
      .then(response => response.json())
      .then((data: MarkdownFile[]) => {
        // Filter Markdown Files
        const mdFiles = data.filter(file => file.name.endsWith('.md'));
        setMarkdownFiles(mdFiles);
        if (mdFiles.length > 0) {
          setSelectedFile(mdFiles[0]); // Select the first markdown file by default
        }
      })
      .catch(error => console.error('Error fetching repository contents:', error));
  }, []);

  useEffect(() => {
    // Fetch Raw Content for the Selected Markdown File
    if (selectedFile) {
      fetch(selectedFile.download_url)
        .then(response => response.text())
        .then(content => setFileContent(content))
        .catch(error => console.error('Error fetching markdown file:', error));
    }
  }, [selectedFile]);

  const handleFileChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedFileName = e.target.value;
    const selected = markdownFiles.find(file => file.name === selectedFileName);
    setSelectedFile(selected || null);
  };

  return (
    <div>
      <h1>Markdown Viewer</h1>
      <div>
        <label htmlFor="fileSelect">Select a Markdown File:</label>
        <select id="fileSelect" onChange={handleFileChange} value={selectedFile?.name || ''}>
          {markdownFiles.map(file => (
            <option key={file.name} value={file.name}>
              {file.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>{selectedFile?.name}</h2>
        <ReactMarkdown>{fileContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownViewer;
