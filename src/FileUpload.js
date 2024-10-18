import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileUpload.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      sessionStorage.setItem('result', JSON.stringify(data));
      navigate('/results');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to upload the file.');
    }
  };

  return (
    <div className="file-upload-container">
      <h1>Please Upload your JSON File</h1>
      <div className="upload-box">
        <label htmlFor="file-input" className="file-label">
          Choose File
        </label>
        <input
          id="file-input"
          type="file"
          onChange={handleFileChange}
          accept=".json"
        />
        {file && <p className="file-name">Selected file: {file.name}</p>}
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default FileUpload;