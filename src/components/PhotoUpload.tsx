import React, { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PhotoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const storageRef = ref(storage, 'memorials/' + file.name);
    try {
      setUploadStatus('Uploading...');
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);
      setUploadStatus('Upload successful!');
      // Save this URL to your Firestore database along with other memorial details
    } catch (error) {
      console.error('Error uploading file: ', error);
      setUploadStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button 
        onClick={handleUpload} 
        disabled={!file}
        className="w-full p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Upload Photo
      </button>
      {uploadStatus && <p className="mt-2 text-center">{uploadStatus}</p>}
    </div>
  );
};

export default PhotoUpload;